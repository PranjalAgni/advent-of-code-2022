class File {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }

  getSize() {
    return parseInt(this.size);
  }
}

class Directory {
  constructor(name, parentDirectory) {
    this.isDir = true;
    this.name = name;
    this.parentDirectory = parentDirectory;
    this.childrens = [];
  }

  size() {
    return this.childrens.reduce(
      /**
       * @param {number} accumulated
       * @param {File | Directory} current
       * @returns
       */
      (accumulated, current) => {
        return (
          accumulated + (current.isDir ? current.size() : current.getSize())
        );
      },
      0
    );
  }
}

class Filesystem {
  /**
   *
   * @param {Array<string>} instructionsList
   */
  constructor(instructionsList) {
    this.rootDirectory = new Directory('/', null);
    this.build(instructionsList);
  }

  /**
   * build the internal representation of filesystem from terminal logs
   * @param {Array<string>} instructionsList
   */
  build(instructionsList) {
    /**
     * Current active directory
     * @type {Directory}
     */
    let currentDirectory = this.rootDirectory;
    for (const instruction of instructionsList) {
      if (instruction.startsWith('$ cd ')) {
        const directoryName = instruction.replace('$ cd ', '').trim();
        if (directoryName === '/') {
          currentDirectory = this.rootDirectory;
        } else if (directoryName === '..') {
          currentDirectory = currentDirectory.parentDirectory;
        } else {
          // here it means we are moving into some directory like: `cd x`
          currentDirectory = currentDirectory.childrens
            .filter((children) => children.isDir)
            .find((directory) => directory.name === directoryName);
        }
      } else if (instruction.startsWith('$ ls')) {
        continue;
      } else {
        const resultingOutput = instruction;
        if (resultingOutput.startsWith('dir')) {
          // its a directory
          const directoryName = instruction.replace('dir ', '').trim();
          const dir = new Directory(directoryName, currentDirectory);
          currentDirectory.childrens.push(dir);
        } else {
          // its a file
          const [size, name] = resultingOutput.split(' ');
          const file = new File(name, size);
          currentDirectory.childrens.push(file);
        }
      }
    }
  }
}

// holds common operations like traversing filesystem
class Disk {
  /**
   *
   * @param {Filesystem} filesystem
   */
  constructor(filesystem) {
    this.fs = filesystem;
    this.diskspace = 700_000_00;
  }

  listDirectoryWithSize(directory, currentDirList) {
    let dirList = [...currentDirList];
    for (const child of directory.childrens) {
      if (child.isDir) {
        dirList.push({ name: child.name, size: child.size() });
        dirList = this.listDirectoryWithSize(child, dirList);
      }
    }
    return dirList;
  }
  getDirectoryHavingSize(thresholdSize) {
    const rootDirectory = this.fs.rootDirectory;
    const directoriesList = this.listDirectoryWithSize(rootDirectory, []);
    let totalSize = 0;
    for (const dir of directoriesList) {
      if (dir.size <= thresholdSize) totalSize += dir.size;
    }

    return totalSize;
  }

  getDirectoryToDelete() {
    const dirList = this.listDirectoryWithSize(this.fs.rootDirectory, []);
    const totalSize = this.fs.rootDirectory.size();
  }
}

module.exports = {
  Filesystem,
  Disk,
};

/**
 * Find possible directories we can delete to free up enough space for update
 * @param {number} spaceForUpdate
 * @returns
 */
// getDirectoryToDelete(spaceForUpdate) {
//   const dirList = this.listDirectoryWithSize(this.fs.rootDirectory, []);
//   const totalSize = this.fs.rootDirectory.size();
//   // add the root directory and its size
//   dirList.push({ name: '/', size: totalSize });

//   const unusedSpace = this.diskspace - totalSize;
//   const spaceToFreeUp = spaceForUpdate - unusedSpace;
//   const directoriesWithEnoughSpace = dirList.filter((dir) => {
//     return dir.size >= spaceToFreeUp;
//   });

//   return directoriesWithEnoughSpace;
// }
