const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
// class Node {
//   constructor(data) {
//   this.data = data;
//   this.left = null;
//   this.right = null;
//   }
// }

class BinarySearchTree {
  constructor() {
    this.rootTree = null; //ссылка на корень дерава
  }

  root() {
    return this.rootTree;
  }

  add(data) {
    this.rootTree = addData(this.rootTree, data); //корень равен значению функции
    
    function addData(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addData(node.left, data);
      } else {
        node.right = addData(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return findData(this.rootTree, data); // поиск значения в дереве
    
    function findData(node, data) {
      if (!node) {
        return false;
      }

      if (data === node.data) {
        return true;
      }
      
      if (data < node.data) {
        return findData(node.left, data);
      } else {
        return findData(node.right, data);
      }
    }
  }

  find(data) {
    return findData(this.rootTree, data); // поиск значения в дереве
    
    function findData(node, data) {
      if (!node) {
        return null;
      }

      if (data === node.data) {
        return node;
      }
      
      if (data < node.data) {
        return findData(node.left, data);
      } else {
        return findData(node.right, data);
      }
    }
  }

  remove(data) {
    this.rootTree = removeNode(this.rootTree, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      }

      if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      }

      if (data === node.data) {
        if (!node.left && !node.right) {
          // узел не имеет потомков, узел можно удалить
          return null;
        }

        if (!node.right) {
          // если нет правого потомка, то заменяем удаленный узел левым потомком
          node = node.left;
          return node;
        }

        if (!node.left) {
          // если нет левого потомка, то заменяем удаленный узел правым потомком
          node = node.right;
          return node;
        }

        // если есть и правый и левый потомки
        // начинаем с корня правого поддерева
        // идем поиском по левым элементам, которые меньше правых
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;

        node.right = removeNode(node.right, minRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootTree) {
      return;
    }

    let node = this.rootTree;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.rootTree) {
      return;
    }

    let node = this.rootTree;
    while (node.right) {
      node = node.right;
    }

    return node.data;   
  }
}

module.exports = {
  BinarySearchTree
};