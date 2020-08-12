/*
shRawLibFetch
{
    "fetchList": [
        {
            "sh": "for MODULES in 72\ndo\n    for PLATFORM in win32\n    do\n        for ARCH in x64\n        do\n            FILE=\"msnodesqlv8-v1.1.8-node-v$MODULES-$PLATFORM-$ARCH\"\n            echo \"https://github.com/TimelordUK/node-sqlserver-v8/releases/download/v1.1.8/$FILE.tar.gz\"\n            curl -A \"chrome\" -Lf \"https://github.com/TimelordUK/node-sqlserver-v8/releases/download/v1.1.8/$FILE.tar.gz\" | tar -O -xz \"build/Release/sqlserverv8.node\" > \".$FILE.node\"\n        done\n    done\ndone\n",
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/build/Release/sqlserverv8.node"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/data-struture/utils/comparator/Comparator.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/data-struture/heap/Heap.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/data-struture/heap/MaxHeap.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/data-struture/heap/MinHeap.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/data-struture/priority-queue/PriorityQueue.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/driver.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/meta.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/MsNodeSqWrapperModule.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/notifier.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/procedure.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/queue.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/reader.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/sequelize/request.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/sequelize/connection.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/sequelize/index.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/table.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/user.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/connection.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/pool.js"
        },
        {
            "url": "https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/sql.js"
        }
    ],
    "isRollupCommonJs": true
}
-//   const cppDriver = exports_TimelordUK_node_sqlserver_v8_lib_build_Release_sqlserverv8_node
+const cppDriver = exports_TimelordUK_node_sqlserver_v8_lib_build_Release_sqlserverv8_node

-// const comparator = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_utils_comparator_Comparator
+const comparator = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_utils_comparator_Comparator

-// const cw = exports_TimelordUK_node_sqlserver_v8_lib_connection.connectionModule
-// const pm = exports_TimelordUK_node_sqlserver_v8_lib_pool.poolModule
+const cw = exports_TimelordUK_node_sqlserver_v8_lib_connection.connectionModule
+const pm = exports_TimelordUK_node_sqlserver_v8_lib_pool.poolModule

-// const heap = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_Heap
+const heap = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_Heap

-// const minHeap = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_priority_queue_heap_MinHeap
+const minHeap = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_MinHeap

-// let userModule      = exports_TimelordUK_node_sqlserver_v8_lib_user.userModule;
+// let userModule      = exports_TimelordUK_node_sqlserver_v8_lib_user.userModule;
+module.exports = exports_TimelordUK_node_sqlserver_v8_lib_sql;

-const cppDriver = exports_TimelordUK_node_sqlserver_v8_lib_build_Release_sqlserverv8_node
+const cppDriver = require("./.msnodesqlv8-v1.1.8-node-v" + process.versions.modules + "-" + process.platform + "-" + process.arch + ".node");

-https://github.com/TimelordUK/node-sqlserver-v8/releases/download/v1.1.8/msnodesqlv8-v1.1.8-node-v72-win32-x64.tar.gz
+// https://github.com/TimelordUK/node-sqlserver-v8/releases/download/v1.1.8/msnodesqlv8-v1.1.8-node-v72-win32-x64.tar.gz

-let comparator      = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_utils_comparator_Comparator;
+// let comparator      = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_utils_comparator_Comparator;

-let debug = require('debug')('msnodesqlv8-sequelize');
+// let debug = require('debug')('msnodesqlv8-sequelize');

-let heap            = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_Heap;
+// let heap            = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_Heap;

-let legacyDriver = require('msnodesqlv8');
-let mssql = require('msnodesqlv8');
+let legacyDriver = {};
+let mssql = legacyDriver;

-let minHeap         = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_priority_queue_heap_MinHeap;
+// let minHeap         = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_priority_queue_heap_MinHeap;

-let uuid = require('uuid');
+// let uuid = require('uuid');
*/


(function () {
"use strict";
let EventEmitter = require('events').EventEmitter;
// let debug = require('debug')('msnodesqlv8-sequelize');
let events = require('events');
let fs = require('fs');
let legacyDriver = {};
let mssql = legacyDriver;
let path = require('path');
let util = require('util');
// let uuid = require('uuid');
let exports_TimelordUK_node_sqlserver_v8_lib_build_Release_sqlserverv8_node = {};
let exports_TimelordUK_node_sqlserver_v8_lib_connection = {};
let exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_Heap = {};
let exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_MaxHeap = {};
let exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_MinHeap = {};
let exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_utils_comparator_Comparator = {};
let exports_TimelordUK_node_sqlserver_v8_lib_data_struture_priority_queue_PriorityQueue = {};
let exports_TimelordUK_node_sqlserver_v8_lib_data_struture_priority_queue_heap_MinHeap = {};
let exports_TimelordUK_node_sqlserver_v8_lib_data_struture_priority_queue_utils_comparator_Comparator = {};
let exports_TimelordUK_node_sqlserver_v8_lib_data_struture_utils_comparator_Comparator = {};
let exports_TimelordUK_node_sqlserver_v8_lib_driver = {};
let exports_TimelordUK_node_sqlserver_v8_lib_meta = {};
let exports_TimelordUK_node_sqlserver_v8_lib_notifier = {};
let exports_TimelordUK_node_sqlserver_v8_lib_pool = {};
let exports_TimelordUK_node_sqlserver_v8_lib_procedure = {};
let exports_TimelordUK_node_sqlserver_v8_lib_queue = {};
let exports_TimelordUK_node_sqlserver_v8_lib_reader = {};
let exports_TimelordUK_node_sqlserver_v8_lib_sequelize_connection = {};
let exports_TimelordUK_node_sqlserver_v8_lib_sequelize_index = {};
let exports_TimelordUK_node_sqlserver_v8_lib_sequelize_request = {};
let exports_TimelordUK_node_sqlserver_v8_lib_sql = {};
let exports_TimelordUK_node_sqlserver_v8_lib_table = {};
let exports_TimelordUK_node_sqlserver_v8_lib_user = {};
/*
repo https://github.com/TimelordUK/node-sqlserver-v8/tree/v1.1.8
committed 2020-07-12T17:15:33Z
*/


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/build/Release/sqlserverv8.node
*/
// https://github.com/TimelordUK/node-sqlserver-v8/releases/download/v1.1.8/msnodesqlv8-v1.1.8-node-v72-win32-x64.tar.gz


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/data-struture/utils/comparator/Comparator.js
*/
class Comparator {
  /**
   * @param {function(a: *, b: *)} [compareFunction] - It may be custom compare function that, let's
   * say may compare custom objects together.
   */
  constructor (compareFunction) {
    this.compare = compareFunction || Comparator.defaultCompareFunction
  }

  /**
   * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
   * @param {(string|number)} a
   * @param {(string|number)} b
   * @returns {number}
   */
  static defaultCompareFunction (a, b) {
    if (a === b) {
      return 0
    }

    return a < b ? -1 : 1
  }

  /**
   * Checks if two variables are equal.
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  equal (a, b) {
    return this.compare(a, b) === 0
  }

  /**
   * Checks if variable "a" is less than "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  lessThan (a, b) {
    return this.compare(a, b) < 0
  }

  /**
   * Checks if variable "a" is greater than "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThan (a, b) {
    return this.compare(a, b) > 0
  }

  /**
   * Checks if variable "a" is less than or equal to "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  lessThanOrEqual (a, b) {
    return this.lessThan(a, b) || this.equal(a, b)
  }

  /**
   * Checks if variable "a" is greater than or equal to "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThanOrEqual (a, b) {
    return this.greaterThan(a, b) || this.equal(a, b)
  }

  /**
   * Reverses the comparison order.
   */
  reverse () {
    const compareOriginal = this.compare
    this.compare = (a, b) => compareOriginal(b, a)
  }
}

exports_TimelordUK_node_sqlserver_v8_lib_data_struture_utils_comparator_Comparator.Comparator = Comparator


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/data-struture/heap/Heap.js
*/
const comparator = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_utils_comparator_Comparator
/**
 * Parent class for Min and Max Heaps.
 */
class Heap {
  /**
   * @constructs Heap
   * @param {Function} [comparatorFunction]
   */
  constructor (comparatorFunction) {
    if (new.target === Heap) {
      throw new TypeError('Cannot construct Heap instance directly')
    }

    // Array representation of the heap.
    this.heapContainer = []
    this.compare = new comparator.Comparator(comparatorFunction)
  }

  /**
   * @param {number} parentIndex
   * @return {number}
   */
  getLeftChildIndex (parentIndex) {
    return (2 * parentIndex) + 1
  }

  /**
   * @param {number} parentIndex
   * @return {number}
   */
  getRightChildIndex (parentIndex) {
    return (2 * parentIndex) + 2
  }

  /**
   * @param {number} childIndex
   * @return {number}
   */
  getParentIndex (childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  /**
   * @param {number} childIndex
   * @return {boolean}
   */
  hasParent (childIndex) {
    return this.getParentIndex(childIndex) >= 0
  }

  /**
   * @param {number} parentIndex
   * @return {boolean}
   */
  hasLeftChild (parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
  }

  /**
   * @param {number} parentIndex
   * @return {boolean}
   */
  hasRightChild (parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length
  }

  /**
   * @param {number} parentIndex
   * @return {*}
   */
  leftChild (parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)]
  }

  /**
   * @param {number} parentIndex
   * @return {*}
   */
  rightChild (parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)]
  }

  /**
   * @param {number} childIndex
   * @return {*}
   */
  parent (childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)]
  }

  /**
   * @param {number} indexOne
   * @param {number} indexTwo
   */
  swap (indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo]
    this.heapContainer[indexTwo] = this.heapContainer[indexOne]
    this.heapContainer[indexOne] = tmp
  }

  /**
   * @return {*}
   */
  peek () {
    if (this.heapContainer.length === 0) {
      return null
    }

    return this.heapContainer[0]
  }

  length () {
    return this.heapContainer.length
  }

  /**
   * @return {*}
   */
  poll () {
    if (this.heapContainer.length === 0) {
      return null
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop()
    }

    const item = this.heapContainer[0]

    // Move the last element from the end to the head.
    this.heapContainer[0] = this.heapContainer.pop()
    this.heapifyDown()

    return item
  }

  /**
   * @param {*} item
   * @return {Heap}
   */
  add (item) {
    this.heapContainer.push(item)
    this.heapifyUp()
    return this
  }

  /**
   * @param {*} item
   * @param {Comparator} [comparator]
   * @return {Heap}
   */
  remove (item, comparator = this.compare) {
    // Find number of items to remove.
    const numberOfItemsToRemove = this.find(item, comparator).length

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      // We need to find item index to remove each time after removal since
      // indices are being changed after each heapify process.
      const indexToRemove = this.find(item, comparator).pop()

      // If we need to remove last child in the heap then just remove it.
      // There is no need to heapify the heap afterwards.
      if (indexToRemove === (this.heapContainer.length - 1)) {
        this.heapContainer.pop()
      } else {
        // Move last element in heap to the vacant (removed) position.
        this.heapContainer[indexToRemove] = this.heapContainer.pop()

        // Get parent.
        const parentItem = this.parent(indexToRemove)

        // If there is no parent or parent is in correct order with the node
        // we're going to delete then heapify down. Otherwise heapify up.
        if (
          this.hasLeftChild(indexToRemove) &&
          (
            !parentItem ||
            this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove])
          )
        ) {
          this.heapifyDown(indexToRemove)
        } else {
          this.heapifyUp(indexToRemove)
        }
      }
    }

    return this
  }

  /**
   * @param {*} item
   * @param {Comparator} [comparator]
   * @return {Number[]}
   */
  find (item, comparator = this.compare) {
    const foundItemIndices = []

    for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex)
      }
    }

    return foundItemIndices
  }

  /**
   * @return {boolean}
   */
  isEmpty () {
    return !this.heapContainer.length
  }

  /**
   * @return {string}
   */
  toString () {
    return this.heapContainer.toString()
  }

  /**
   * @param {number} [customStartIndex]
   */
  heapifyUp (customStartIndex) {
    // Take the last element (last in array or the bottom left in a tree)
    // in the heap container and lift it up until it is in the correct
    // order with respect to its parent element.
    let currentIndex = customStartIndex || this.heapContainer.length - 1

    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex))
      currentIndex = this.getParentIndex(currentIndex)
    }
  }

  /**
   * @param {number} [customStartIndex]
   */
  heapifyDown (customStartIndex = 0) {
    // Compare the parent element to its children and swap parent with the appropriate
    // child (smallest child for MinHeap, largest child for MaxHeap).
    // Do the same for next children after swap.
    let currentIndex = customStartIndex
    let nextIndex = null

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
      ) {
        nextIndex = this.getRightChildIndex(currentIndex)
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex)
      }

      if (this.pairIsInCorrectOrder(
        this.heapContainer[currentIndex],
        this.heapContainer[nextIndex]
      )) {
        break
      }

      this.swap(currentIndex, nextIndex)
      currentIndex = nextIndex
    }
  }

  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {*} firstElement
   * @param {*} secondElement
   * @return {boolean}
   */

  /* istanbul ignore next */
  pairIsInCorrectOrder (firstElement, secondElement) {
    throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondElement} values.
    `)
  }
}

exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_Heap.Heap = Heap


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/data-struture/heap/MaxHeap.js
*/
const heap = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_Heap

class MaxHeap extends heap.Heap {
  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {*} firstElement
   * @param {*} secondElement
   * @return {boolean}
   */
  pairIsInCorrectOrder (firstElement, secondElement) {
    return this.compare.greaterThanOrEqual(firstElement, secondElement)
  }
}

exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_MaxHeap.MaxHeap = MaxHeap


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/data-struture/heap/MinHeap.js
*/
// const heap = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_Heap

class MinHeap extends heap.Heap {
  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {*} firstElement
   * @param {*} secondElement
   * @return {boolean}
   */
  pairIsInCorrectOrder (firstElement, secondElement) {
    return this.compare.lessThanOrEqual(firstElement, secondElement)
  }
}

exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_MinHeap.MinHeap = MinHeap


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/data-struture/priority-queue/PriorityQueue.js
*/
const minHeap = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_MinHeap
// const comparator = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_priority_queue_utils_comparator_Comparator

// It is the same as min heap except that when comparing two elements
// we take into account its priority instead of the element's value.
class PriorityQueue extends minHeap.MinHeap {
  constructor () {
    // Call MinHip constructor first.
    super()

    // Setup priorities map.
    this.priorities = new Map()

    // Use custom comparator for heap elements that will take element priority
    // instead of element value into account.
    this.compare = new comparator.Comparator(this.comparePriority.bind(this))
  }

  /**
   * Add item to the priority queue.
   * @param {*} item - item we're going to add to the queue.
   * @param {number} [priority] - items priority.
   * @return {PriorityQueue}
   */
  add (item, priority = 0) {
    this.priorities.set(item, priority)
    super.add(item)
    return this
  }

  /**
   * Remove item from priority queue.
   * @param {*} item - item we're going to remove.
   * @param {Comparator} [customFindingComparator] - custom function for finding the item to remove
   * @return {PriorityQueue}
   */
  remove (item, customFindingComparator) {
    super.remove(item, customFindingComparator)
    this.priorities.delete(item)
    return this
  }

  /**
   * Change priority of the item in a queue.
   * @param {*} item - item we're going to re-prioritize.
   * @param {number} priority - new item's priority.
   * @return {PriorityQueue}
   */
  changePriority (item, priority) {
    this.remove(item, new comparator.Comparator(this.compareValue))
    this.add(item, priority)
    return this
  }

  /**
   * Find item by ite value.
   * @param {*} item
   * @return {Number[]}
   */
  findByValue (item) {
    return this.find(item, new comparator.Comparator(this.compareValue))
  }

  /**
   * Check if item already exists in a queue.
   * @param {*} item
   * @return {boolean}
   */
  hasValue (item) {
    return this.findByValue(item).length > 0
  }

  /**
   * Compares priorities of two items.
   * @param {*} a
   * @param {*} b
   * @return {number}
   */
  comparePriority (a, b) {
    if (this.priorities.get(a) === this.priorities.get(b)) {
      return 0
    }
    return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1
  }

  /**
   * Compares values of two items.
   * @param {*} a
   * @param {*} b
   * @return {number}
   */
  compareValue (a, b) {
    if (a === b) {
      return 0
    }
    return a < b ? -1 : 1
  }
}

exports_TimelordUK_node_sqlserver_v8_lib_data_struture_priority_queue_PriorityQueue.PriorityQueue = PriorityQueue


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/driver.js
*/
/* global: bindQuery */

'use strict'

const driverModule = ((() => {
//   const readerModule = exports_TimelordUK_node_sqlserver_v8_lib_reader.readerModule
//   const queueModule = exports_TimelordUK_node_sqlserver_v8_lib_queue.queueModule

  function DriverMgr (sql) {
    const driverCommandEnum = {
      CANCEL: 10,
      COMMIT: 11,
      ROLLBACK: 12,
      BEGIN_TRANSACTION: 13,
      PREPARE: 14,
      FREE_STATEMENT: 15,
      QUERY: 16,
      CLOSE: 17,
      UNBIND: 18
    }

    const cppDriver = sql
    const workQueue = new queueModule.WorkQueue()
    const reader = new readerModule.DriverRead(cppDriver, workQueue)
    let lastId = -1

    function setUseUTC (utc) {
      reader.setUseUTC(utc)
    }

    function emptyQueue () {
      workQueue.emptyQueue()
    }

    function close (callback) {
      workQueue.enqueue(driverCommandEnum.CLOSE, () => {
        cppDriver.close(() => {
          callback()
        })
      }, [])
    }

    function execCancel (qid, queueItem, callback) {
      // send cancel directly to driver.
      const args = queueItem.args
      const cb = args[3]
      const peek = workQueue.peek()
      if (queueItem.operationId === peek.operationId) {
        cppDriver.pollingMode(qid, true, () => {
          cppDriver.cancelQuery(qid, err => {
            setImmediate(() => {
              if (err && err.length > 0) {
                callback(err[0])
              } else {
                callback(null)
              }
            })
          })
        })
      } else {
        workQueue.dropItem(queueItem)
        setImmediate(() => {
          // make a callback on the cancel request with no error.
          callback(null)
          // invoke the listener as if this has come from driver so user query callback can be invoked.
          cb(new Error('Error: [msnodesql] (query removed from q) Operation canceled'))
        })
      }
      return true
    }

    // if this relates to the active query being executed then immediately send
    // the cancel, else the query can be removed from the queue and never submitted to the driver.

    function cancel (notify, callback) {
      const qid = notify.getQueryId()
      if (workQueue.length() === 0) {
        setImmediate(() => {
          callback(new Error(`Error: [msnodesql] cannot cancel query (empty queue) id ${qid}`))
        })
        return
      }

      const first = workQueue.first((idx, currentItem) => {
        if (currentItem.commandType !== driverCommandEnum.QUERY) {
          return false
        }
        const args = currentItem.args
        const not = args[0]
        const currentQueryId = not.getQueryId()
        return qid === currentQueryId
      })

      if (first) {
        if (first.paused) {
          freeStatement(notify, () => {
            workQueue.dropItem(first)
            callback(null)
          })
        } else {
          execCancel(qid, first, callback)
        }
      } else {
        setImmediate(() => {
          callback(new Error(`Error: [msnodesql] cannot cancel query (not found) id ${qid}`))
        })
      }
    }

    function objectify (results) {
      const names = {}

      const lim = results.meta
        ? results.meta.length
        : 0

      for (let idx = 0; idx < lim; idx += 1) {
        const meta = results.meta[idx]
        const name = meta.name
        if (name !== '' && !names[name]) {
          names[name] = idx
        } else {
          let extra = 0
          let candidate = `Column${idx}`
          while (names[candidate]) {
            candidate = `Column${idx}_${extra}`
            extra += 1
          }
          names[candidate] = idx
        }
      }

      const rows = []
      if (results.rows) {
        results.rows.forEach(row => {
          const value = {}
          Object.keys(names).forEach(name => {
            if (Object.prototype.hasOwnProperty.call(names, name)) {
              value[name] = row[names[name]]
            }
          })
          rows.push(value)
        })
      }

      return rows
    }

    function freeStatement (notify, callback) {
      const queryId = notify.getQueryId()
      if (queryId > lastId) {
        lastId = queryId
        workQueue.enqueue(driverCommandEnum.FREE_STATEMENT, () => {
          cppDriver.freeStatement(queryId, () => {
            callback(queryId)
            setImmediate(() => {
              notify.emit('free', queryId)
            })
            workQueue.nextOp()
          })
        }, [])
      } else {
        callback(queryId)
        setImmediate(() => {
          notify.emit('free', queryId)
        })
        workQueue.nextOp()
      }
    }

    function onStatementComplete (notify, outputParams, callback, results, more) {
      if (!more) {
        freeStatement(notify, () => {
          if (callback) {
            callback(null, results, more, outputParams)
          }
        })
      } else {
        if (callback) {
          callback(null, results, more, outputParams)
        }
      }
    }

    // for a stored procedure, the out parameters / return value can
    // only be unbound when rest of query completes. The output params
    // will now be ready to fetch out of the statement.

    function beginTransaction (callback) {
      workQueue.enqueue(driverCommandEnum.BEGIN_TRANSACTION, () => {
        cppDriver.beginTransaction(err => {
          callback(err)
          workQueue.nextOp()
        })
      }, [])
    }

    function rollback (callback) {
      workQueue.enqueue(driverCommandEnum.ROLLBACK, () => {
        cppDriver.rollback(err => {
          callback(err)
          workQueue.nextOp()
        })
      }, [])
    }

    function commit (callback) {
      workQueue.enqueue(driverCommandEnum.COMMIT, () => {
        cppDriver.commit(err => {
          callback(err)
          workQueue.nextOp()
        })
      }, [])
    }

    function prepare (notify, queryOrObj, callback) {
      workQueue.enqueue(driverCommandEnum.PREPARE, () => {
        cppDriver.prepare(notify.getQueryId(), queryOrObj, (err, meta) => {
          callback(err, meta)
          workQueue.nextOp()
        })
      }, [])
    }

    function readAllPrepared (notify, queryObj, params, cb) {
      notify.setOperation(workQueue.enqueue(driverCommandEnum.QUERY,
        (notify, query, params, callback) => {
          setImmediate(() => {
            const q = reader.getQuery(notify, query, params, {
              begin: (queryId, query, params, callback) => {
                cppDriver.bindQuery(queryId, params, (err, meta) => {
                  if (callback) {
                    callback(err, meta)
                  }
                })
              },
              end: (queryId, outputParams, callback, results, more) => {
                if (callback) {
                  callback(null, results, more, outputParams)
                }
              }
            }, callback)
            notify.setQueryWorker(q)
            q.begin()
          })
        }, [notify, queryObj, params, cb]))
    }

    function read (notify, queryObj, params, cb) {
      notify.setOperation(workQueue.enqueue(driverCommandEnum.QUERY, (notify, query, params, callback) => {
        setImmediate(() => {
          const q = reader.getQuery(notify, query, params, {
            begin: (queryId, query, params, callback) => cppDriver.query(queryId, query, params, (err, results, more) => {
              if (callback) {
                callback(err, results, more)
              }
            }),
            end: (not, outputParams, callback, results, endMore) => {
              onStatementComplete(not, outputParams, callback, results, endMore)
            }
          }, callback)
          notify.setQueryWorker(q)
          q.begin()
        })
      }, [notify, queryObj, params, cb]))
    }

    function readAllQuery (notify, queryObj, params, cb) {
      // if paused at head of q then kill this statement to allow driver to set up this one
      const peek = workQueue.peek()
      if (peek && peek.paused) {
        const pausedNotify = peek.args[0]
        freeStatement(pausedNotify, () => {
          workQueue.dropItem(peek)
          read(notify, queryObj, params, cb)
        })
      } else {
        read(notify, queryObj, params, cb)
      }
    }

    function realAllProc (notify, queryObj, params, cb) {
      notify.setOperation(workQueue.enqueue(driverCommandEnum.QUERY,
        (notify, query, params, callback) => {
          setImmediate(() => {
            const q = reader.getQuery(notify, query, params, {
              begin: (queryId, procedure, params, callback) => {
                cppDriver.callProcedure(queryId, procedure, params, (err, results, params) => {
                  if (callback) {
                    callback(err, results, params)
                  }
                })
              },
              // for a stored procedure with multiple statements, only unbind after all
              // statements are completed
              end: (not, outputParams, callback, results, endMore) => {
                if (!endMore) {
                  const qid = not.getQueryId()
                  workQueue.enqueue(driverCommandEnum.UNBIND, (a) => {
                    setImmediate(() => {
                      cppDriver.unbind(qid, (err, outputVector) => {
                        if (err && callback) {
                          callback(err, results)
                        }
                        onStatementComplete(not, outputVector, callback, results, a)
                        if (!a) {
                          workQueue.nextOp()
                        }
                      })
                    }, [endMore])
                  })
                } else {
                  onStatementComplete(not, null, callback, results, endMore)
                }
              }
            }, callback)
            notify.setQueryWorker(q)
            q.begin()
          })
        }, [notify, queryObj, params, cb]))
    }

    return {
      setUseUTC: setUseUTC,
      cancel: cancel,
      commit: commit,
      rollback: rollback,
      beginTransaction: beginTransaction,
      prepare: prepare,
      objectify: objectify,
      freeStatement: freeStatement,
      readAllQuery: readAllQuery,
      realAllProc: realAllProc,
      readAllPrepared: readAllPrepared,
      emptyQueue: emptyQueue,
      close: close
    }
  }

  return {
    DriverMgr: DriverMgr
  }
})())

exports_TimelordUK_node_sqlserver_v8_lib_driver.driverModule = driverModule


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/meta.js
*/
'use strict'

const metaModule = (() => {
//   const fs = require('fs')
//   const path = require('path')

  function FileReader (file) {
    let resolvedSql

    function readFile (f) {
      return new Promise((resolve, reject) => {
        fs.readFile(f, 'utf8', (err, contents) => {
          if (err) {
            reject(err)
          } else {
            resolve(contents)
          }
        })
      })
    }

    function resolve () {
      return new Promise((resolve, reject) => {
        if (!resolvedSql) {
          const p = path.join(__dirname, 'queries', file)
          readFile(p).then(sql => {
            resolvedSql = sql
            resolve(resolvedSql)
          }).catch(e => {
            reject(e)
          })
        } else {
          resolve(resolvedSql)
        }
      })
    }

    function query (conn, mapFn) {
      const inst = this
      return new Promise((resolve, reject) => {
        inst.resolve().then(sql => {
          sql = mapFn ? mapFn(sql) : sql
          conn.query(sql, (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
          })
        }).catch(e => {
          reject(e)
        })
      })
    }

    return {
      resolve: resolve,
      query: query
    }
  }

  function Meta () {
    const describeProc = new FileReader('proc_describe.sql')
    const describeServerVersion = new FileReader('server_version.sql')
    const describeTableType = new FileReader('user_type.sql')
    const describeTable = new FileReader('table_describe.sql')
    const describeTable2014 = new FileReader('table_describe.2014.sql')

    function getUserType (conn, userTypeName, mapFn) {
      return new Promise((resolve, reject) => {
        describeTableType.query(conn, mapFn).then(typeResults => {
          typeResults.forEach(col => {
            col.type = {
              declaration: col.declaration,
              length: col.length
            }
          })
          resolve(typeResults)
        }).catch(err => {
          reject(err)
        })
      })
    }

    function getProcedureDefinition (conn, procedureName, mapFn) {
      return describeProc.query(conn, mapFn)
    }

    function getServerVersionRes (conn) {
      return describeServerVersion.query(conn)
    }

    function getTableDefinition (conn, majorVersion, mapFn) {
      const target = majorVersion <= 2014 ? describeTable2014 : describeTable
      return target.query(conn, mapFn)
    }

    return {
      getUserType: getUserType,
      getProcedureDefinition: getProcedureDefinition,
      getTableDefinition: getTableDefinition,
      getServerVersionRes: getServerVersionRes
    }
  }

  return {
    Meta: Meta
  }
})()

/*
    provide support to fetch table and procedure meta data, injected into procedure manager and tableManager
  */

exports_TimelordUK_node_sqlserver_v8_lib_meta.metaModule = metaModule


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/MsNodeSqWrapperModule.js
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MsNodeSqlWrapperModule;
(function (MsNodeSqlWrapperModule) {
//     const legacyDriver = require('msnodesqlv8');
    class SqlModuleWrapperError {
        constructor(message) {
            this.message = message;
            this.sqlstate = "";
            this.code = 0;
        }
    }
    MsNodeSqlWrapperModule.SqlModuleWrapperError = SqlModuleWrapperError;
    let SqlCommandType;
    (function (SqlCommandType) {
        SqlCommandType[SqlCommandType["None"] = 0] = "None";
        SqlCommandType[SqlCommandType["QueryObjectFormat"] = 1] = "QueryObjectFormat";
        SqlCommandType[SqlCommandType["QueryRawFormat"] = 2] = "QueryRawFormat";
        SqlCommandType[SqlCommandType["StoredProcedure"] = 3] = "StoredProcedure";
        SqlCommandType[SqlCommandType["PreparingStatement"] = 4] = "PreparingStatement";
        SqlCommandType[SqlCommandType["PreparedStatement"] = 5] = "PreparedStatement";
    })(SqlCommandType = MsNodeSqlWrapperModule.SqlCommandType || (MsNodeSqlWrapperModule.SqlCommandType = {}));
    class SqlCommand {
        constructor(connection, id, commandType = SqlCommandType.QueryObjectFormat) {
            this.connection = connection;
            this.id = id;
            this.commandType = commandType;
        }
        isPrepared() {
            return this.commandType == SqlCommandType.PreparingStatement;
        }
        sql(s) {
            this._sql = s;
            if (this.commandType == SqlCommandType.None)
                this.commandType = SqlCommandType.QueryObjectFormat;
            return this;
        }
        params(v) {
            this._inputParams = v;
            return this;
        }
        param(v) {
            if (this._inputParams == null) {
                this._inputParams = [];
            }
            this._inputParams.push(v);
            return this;
        }
        procedure(s) {
            this._procedure = s;
            this.commandType = SqlCommandType.StoredProcedure;
            this.unsubscribe();
            return this;
        }
        rawFormat() {
            this.commandType = SqlCommandType.QueryRawFormat;
            return this;
        }
        wrapperTimeoutMs(to) {
            this._wrapperTimeoutMs = to;
            return this;
        }
        driverTimeoutMs(to) {
            this._driverTimeoutMs = to;
            return this;
        }
        onMeta(cb) {
            this._onMeta = cb;
            return this;
        }
        onColumn(cb) {
            this._onColumn = cb;
            return this;
        }
        onRowCount(cb) {
            this._onRowCount = cb;
            return this;
        }
        onRow(cb) {
            this._onRow = cb;
            return this;
        }
        onDone(cb) {
            this._onDone = cb;
            return this;
        }
        onSubmitted(cb) {
            this._onSubmitted = cb;
            return this;
        }
        onError(cb) {
            this._onError = cb;
            return this;
        }
        onClosed(cb) {
            this._onClosed = cb;
            return this;
        }
        unsubscribe() {
            this._onMeta = undefined;
            this._onColumn = undefined;
            this._onRowCount = undefined;
            this._onRow = undefined;
            this._onDone = undefined;
            this._onError = undefined;
            this._onClosed = undefined;
        }
        subscribe() {
            let query = this._query;
            if (query) {
                if (this._onMeta != null) {
                    query.on('meta', (m) => this._onMeta(m));
                }
                if (this._onColumn != null) {
                    query.on('column', (c, d, m) => this._onColumn(c, d, m));
                }
                if (this._onRowCount != null) {
                    query.on('rowCount', (m) => this._onRowCount(m));
                }
                if (this._onRow != null) {
                    query.on('row', (m) => this._onRow(m));
                }
                if (this._onDone != null) {
                    query.on('done', m => this._onDone(m));
                }
                if (this._onError != null) {
                    query.on('error', m => this._onError(m));
                }
                if (this._onClosed != null) {
                    query.on('closed', m => this._onClosed(m));
                }
                if (this._onSubmitted != null) {
                    query.on('submitted', m => this._onSubmitted(m));
                }
            }
        }
        subscribing() {
            return this._onMeta != null
                || this._onSubmitted != null
                || this._onColumn != null
                || this._onRowCount != null
                || this._onRow != null
                || this._onDone != null
                || this._onError != null
                || this._onClosed != null;
        }
        execProcedure(resolve, reject, res) {
            let timeout = this._driverTimeoutMs > 0 ? this._driverTimeoutMs / 1000 : 0;
            let pm = this.connection.legacy_conn.procedureMgr();
            pm.setTimeout(timeout);
            pm.callproc(this._procedure, this._inputParams, (err, rows, outputParams) => {
                if (err) {
                    res.error = err;
                    reject(res);
                }
                else {
                    res.aggregate(rows);
                    res.outputParams = outputParams;
                    resolve(res);
                }
            });
        }
        execQuery(resolve, reject, res) {
            let timeout = this._driverTimeoutMs > 0 ? this._driverTimeoutMs / 1000 : 0;
            this._query = this.connection.legacy_conn.query({
                query_str: this._sql,
                query_timeout: timeout
            }, this._inputParams, (err, rows, more) => {
                if (err) {
                    res.error = err;
                    reject(res);
                }
                else {
                    res.aggregate(rows);
                    if (!more)
                        resolve(res);
                }
            });
        }
        execQueryRaw(resolve, reject, res) {
            let timeout = this._driverTimeoutMs > 0 ? this._driverTimeoutMs / 1000 : 0;
            this._query = this.connection.legacy_conn.queryRaw({
                query_str: this._sql,
                query_timeout: timeout
            }, this._inputParams, (err, rawData, more) => {
                if (err) {
                    res.error = err;
                    reject(res);
                }
                else {
                    res.aggregateRaw(rawData);
                    if (!more)
                        resolve(res);
                }
            });
        }
        execPrepared(resolve, reject, res) {
            this._preparedStatement.preparedQuery(this._inputParams, (err, rows, more) => {
                if (err) {
                    res.error = err;
                    reject(res);
                }
                else {
                    res.aggregate(rows);
                    if (!more)
                        resolve(res);
                }
            });
        }
        cancel() {
            return new Promise((resolve, reject) => {
                let inst = this;
                if (!this._query) {
                    reject(new SqlModuleWrapperError('can only cancel a submitted query.'));
                    return;
                }
                this._query.cancelQuery(err => {
                    if (!err)
                        reject(new SqlModuleWrapperError(`failed to cancel: ${err.message}`));
                    resolve(inst);
                });
            });
        }
        freePrepared() {
            return new Promise((resolve, reject) => {
                let inst = this;
                if (this.commandType != SqlCommandType.PreparedStatement) {
                    reject(new SqlModuleWrapperError('freePrepared must be called on prepared command.'));
                    return;
                }
                this._preparedStatement.free(() => {
                    inst._preparedStatement = null;
                    inst.commandType = SqlCommandType.None;
                    resolve(inst);
                });
            });
        }
        prepare() {
            return new Promise((resolve, reject) => {
                if (this._sql == null) {
                    reject(new SqlModuleWrapperError('prepare must be called after sql() with sql to prepare.'));
                    return;
                }
                if (this.commandType == SqlCommandType.PreparingStatement) {
                    reject(new SqlModuleWrapperError('prepare is preparing and must be called once only on a command.'));
                    return;
                }
                if (this._preparedStatement != null) {
                    reject(new SqlModuleWrapperError('this command has previously been prepared.'));
                    return;
                }
                this.commandType = SqlCommandType.PreparingStatement;
                this.unsubscribe();
                let inst = this;
                this.connection.legacy_conn.prepare(this._sql, (err, statement) => {
                    if (err) {
                        reject(err);
                        inst.commandType = SqlCommandType.None;
                    }
                    else {
                        inst._preparedStatement = statement;
                        inst.commandType = SqlCommandType.PreparedStatement;
                        resolve(inst);
                    }
                });
            });
        }
        dispatchCommandType(resolve, reject, res) {
            switch (this.commandType) {
                case SqlCommandType.QueryObjectFormat: {
                    this.execQuery(resolve, reject, res);
                    break;
                }
                case SqlCommandType.QueryRawFormat: {
                    this.execQueryRaw(resolve, reject, res);
                    break;
                }
                case SqlCommandType.StoredProcedure: {
                    this.execProcedure(resolve, reject, res);
                    break;
                }
                case SqlCommandType.PreparingStatement: {
                    res.error = new SqlModuleWrapperError(`statement not yet prepared.`);
                    break;
                }
                case SqlCommandType.PreparedStatement: {
                    this.execPrepared(resolve, reject, res);
                    break;
                }
                default: {
                    res.error = new SqlModuleWrapperError(`${this.commandType} is not valid value.`);
                    break;
                }
            }
        }
        execute() {
            return new Promise((resolve, reject) => {
                let res = new SqlCommandResponse();
                let to = this._wrapperTimeoutMs;
                if (to > 0) {
                    setTimeout(to, () => {
                        res.error = new SqlModuleWrapperError(`wrapper timeout ${to} expired.`);
                        reject(res);
                    });
                }
                this.dispatchCommandType(resolve, reject, res);
                if (res.error != null) {
                    reject(res);
                }
                else if (this.subscribing()) {
                    this.subscribe();
                }
            });
        }
    }
    MsNodeSqlWrapperModule.SqlCommand = SqlCommand;
    class RawData {
        constructor() {
            this.meta = [];
        }
    }
    MsNodeSqlWrapperModule.RawData = RawData;
    class SqlCommandResponse {
        constructor() {
            this.asObjects = [];
        }
        aggregateRaw(raw) {
            let rd = this.rawData;
            if (rd == null) {
                this.rawData = rd = new RawData();
                rd.meta = raw.meta;
                rd.rows = [];
            }
            raw.rows.forEach(row => rd.rows.push(row));
        }
        aggregate(rows) {
            if (this.asObjects == null) {
                this.asObjects = [];
            }
            rows.forEach(r => this.asObjects.push(r));
        }
    }
    MsNodeSqlWrapperModule.SqlCommandResponse = SqlCommandResponse;
    class Dictionary {
        constructor() {
            this.container = {};
        }
        count() {
            let keys = Object.keys(this.container);
            return keys.length;
        }
        values() {
            let va = [];
            let keys = Object.keys(this.container);
            keys.forEach(k => va.push(this.container[k]));
            return va;
        }
        keys() {
            return Object.keys(this.container);
        }
        containsKey(key) {
            return this.container[key] != null;
        }
        add(key, v) {
            if (this.containsKey(key))
                throw new Error(`duplicate key ${key}`);
            this.container[key] = v;
        }
        remove(key) {
            delete this.container[key];
        }
        get(key) {
            return this.container[key];
        }
        forEach(cb) {
            Object.keys(this.container).forEach((k) => cb(k, this.container[k]));
        }
    }
    MsNodeSqlWrapperModule.Dictionary = Dictionary;
    class ConnectionPool {
        constructor() {
            this.connections = new Dictionary();
        }
    }
    MsNodeSqlWrapperModule.ConnectionPool = ConnectionPool;
    class CommandCache {
        constructor(connection) {
            this.connection = connection;
            this.CachedCommands = new Dictionary();
        }
        get(id) {
            if (id == null)
                return new SqlCommand(this.connection);
            let cached = this.CachedCommands.get(id);
            if (cached == null) {
                cached = new SqlCommand(this.connection);
                this.CachedCommands.add(id, cached);
            }
            return cached;
        }
        free(commandId) {
            return new Promise((resolve, reject) => {
                let c = this.CachedCommands.get(commandId);
                if (c == null) {
                    reject(false);
                    return;
                }
                if (c.isPrepared()) {
                    c.freePrepared().then(() => {
                        this.CachedCommands.remove(commandId);
                        resolve(commandId);
                    });
                }
                else {
                    this.CachedCommands.remove(commandId);
                    resolve(commandId);
                }
            });
        }
        deleteAll() {
            return new Promise((resolve, reject) => {
                this.CachedCommands.forEach((id, c) => {
                    this.free(id).then(() => {
                        if (this.CachedCommands.count() == 0) {
                            resolve(true);
                        }
                    }).catch(e => {
                        reject(e);
                    });
                });
            });
        }
    }
    MsNodeSqlWrapperModule.CommandCache = CommandCache;
    class SqlConnection {
        constructor(legacy_conn) {
            this.legacy_conn = legacy_conn;
            this.CommandCache = new CommandCache(this);
        }
        id() {
            return this.legacy_conn.id.toString();
        }
        getCommand() {
            return new SqlCommand(this);
        }
        static getLegacy() {
            return legacyDriver;
        }
        close() {
            return new Promise((resolve, reject) => {
                this.legacy_conn.close((err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
            });
        }
    }
    MsNodeSqlWrapperModule.SqlConnection = SqlConnection;
    class Sql {
        constructor(connStr) {
            this.connStr = connStr;
        }
        execute(sql, params = [], raw = false) {
            return new Promise((resolve, reject) => {
                this.open().then((connection) => {
                    let command = new SqlCommand(connection);
                    if (raw)
                        command = command.rawFormat();
                    command.sql(sql).params(params).execute().then(res => {
                        connection.close().then(() => {
                            resolve(res);
                        }).catch(e => {
                            reject(e);
                        });
                    }).catch(e => {
                        reject(e);
                    });
                }).catch(e => {
                    reject(e);
                });
            });
        }
        open(timeout = 0) {
            return new Promise((resolve, reject) => {
                legacyDriver.open({
                    conn_str: this.connStr,
                    conn_timeout: timeout
                }, (err, legacy) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let connection = new SqlConnection(legacy);
                        resolve(connection);
                    }
                });
            });
        }
    }
    MsNodeSqlWrapperModule.Sql = Sql;
})(MsNodeSqlWrapperModule = exports.MsNodeSqlWrapperModule || (exports.MsNodeSqlWrapperModule = {}));
//# sourceMappingURL=MsNodeSqWrapperModule.js.map


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/notifier.js
*/
/**
 * Created by Stephen on 28/06/2017.
 */

'use strict'

const notifyModule = ((() => {
//   const events = require('events')
//   const util = require('util')

  function NotifyFactory () {
    let nextId = 0

    function StreamEvents () {
      const queryId = nextId
      nextId += 1
      let theConnection
      let queryObj
      let queryWorker
      let operation
      let paused

      function isPaused () {
        return paused
      }

      function getQueryObj () {
        return queryObj
      }

      function getQueryId () {
        return queryId
      }

      function setOperation (id) {
        operation = id
      }

      function getOperation () {
        return operation
      }

      function setQueryObj (qo) {
        queryObj = qo
      }

      function setConn (c) {
        theConnection = c
      }

      function setQueryWorker (qw) {
        queryWorker = qw
        if (paused) {
          queryWorker.pause()
        }
      }

      function cancelQuery (cb) {
        if (theConnection) {
          theConnection.cancelQuery(this, cb)
        } else {
          setImmediate(() => {
            cb(new Error('[msnodesql] cannot cancel query where setConn has not been set'))
          })
        }
      }

      function pauseQuery () {
        paused = true
        if (queryWorker) {
          queryWorker.pause()
        }
      }

      function resumeQuery () {
        paused = false
        if (queryWorker) {
          queryWorker.resume()
        }
      }

      this.setOperation = setOperation
      this.getOperation = getOperation
      this.getQueryObj = getQueryObj
      this.getQueryId = getQueryId
      this.setConn = setConn
      this.setQueryObj = setQueryObj
      this.cancelQuery = cancelQuery
      this.setQueryWorker = setQueryWorker
      this.pauseQuery = pauseQuery
      this.resumeQuery = resumeQuery
      this.isPaused = isPaused

      events.EventEmitter.call(this)
    }

    util.inherits(StreamEvents, events.EventEmitter)

    function getChunkyArgs (paramsOrCallback, callback) {
      if ((typeof paramsOrCallback === 'object' &&
        Array.isArray(paramsOrCallback) === true) &&
        typeof callback === 'function') {
        return { params: paramsOrCallback, callback: callback }
      }

      if (!paramsOrCallback && typeof callback === 'function') {
        return { params: [], callback: callback }
      }

      if (typeof paramsOrCallback === 'function' && callback === undefined) {
        return { params: [], callback: paramsOrCallback }
      }

      if ((typeof paramsOrCallback === 'object' &&
        Array.isArray(paramsOrCallback) === true) &&
        callback === undefined) {
        return { params: paramsOrCallback, callback: null }
      }

      if ((!paramsOrCallback) &&
        callback === undefined) {
        return { params: [], callback: null }
      }

      throw new Error('[msnodesql] Invalid parameter(s) passed to function query or queryRaw.')
    }

    function getQueryObject (p) {
      return typeof (p) === 'string'
        ? {
          query_str: p,
          query_timeout: 0,
          query_polling: false,
          query_tz_adjustment: 0
        }
        : p
    }

    function validateParameters (parameters, funcName) {
      parameters.forEach(p => {
        if (typeof p.value !== p.type) {
          throw new Error(['[msnodesql] Invalid ', p.name, ' passed to function ', funcName, '. Type should be ', p.type, '.'].join(''))
        }
      })
    }

    function validateQuery (queryOrObj, useUTC, parentFn) {
      const queryObj = getQueryObject(queryOrObj, useUTC)
      validateParameters(
        [
          {
            type: 'string',
            value: queryObj.query_str,
            name: 'query string'
          }
        ],
        parentFn
      )
      return queryObj
    }

    return {
      StreamEvents: StreamEvents,
      validateParameters: validateParameters,
      getChunkyArgs: getChunkyArgs,
      validateQuery: validateQuery
    }
  }

  return {
    NotifyFactory: NotifyFactory
  }
})())

exports_TimelordUK_node_sqlserver_v8_lib_notifier.notifyModule = notifyModule


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/procedure.js
*/
/**
 * Created by Stephen on 9/27/2015.
 */

'use strict'

const procedureModule = ((() => {
  function BoundProcedure (connectionDriverMgr, procedureNotifier, theConnection, procedureMeta, procedureName, pollingEnabled, procedureTimeout) {
    const conn = theConnection
    const driverMgr = connectionDriverMgr
    const notifier = procedureNotifier
    const meta = procedureMeta
    const name = procedureName
    let timeout = procedureTimeout
    let polling = pollingEnabled

    function setTimeout (t) {
      timeout = t
    }

    function setPolling (b) {
      polling = b
    }

    function getMeta () {
      return meta
    }

    function getName () {
      return name
    }

    function callStoredProcedure (notify, signature, paramsOrCallback, callback) {
      const queryOb = {
        query_str: signature,
        query_timeout: timeout,
        query_polling: polling
      }

      notifier.validateParameters(
        [
          {
            type: 'string',
            value: queryOb.query_str,
            name: 'query string'
          }
        ],
        'callproc'
      )

      notify.setQueryObj(queryOb)
      const chunky = notifier.getChunkyArgs(paramsOrCallback, callback)

      function onProcedureRaw (err, results, more, outputParams) {
        if (chunky.callback) {
          if (err) {
            chunky.callback(err)
          } else {
            chunky.callback(err, driverMgr.objectify(results), outputParams, more)
          }
        }
      }

      if (callback) {
        driverMgr.realAllProc(notify, queryOb, chunky.params, onProcedureRaw)
      } else {
        driverMgr.realAllProc(notify, queryOb, chunky.params)
      }

      return notify
    }

    function paramsArray (params) {
      if (Array.isArray(params)) {
        return params
      }
      return meta.params.reduce((agg, latest) => {
        const name = latest.name.slice(1)
        if (latest.is_output) return agg
        const v = Object.prototype.hasOwnProperty.call(params, name) ? params[name] : null
        agg.push(v)
        return agg
      }, [])
    }

    function bindParams (meta, params) {
      const vec = []
      let j = 0

      for (let i = 0; i < meta.params.length; i += 1) {
        vec[vec.length] = {
          is_output: meta.params[i].is_output,
          type_id: meta.params[i].type_id,
          max_length: meta.params[i].max_length,
          is_user_defined: meta.params[i].is_user_defined,
          val: null
        }
      }

      for (let i = 0; i < params.length; i += 1) {
        while (j < meta.params.length && meta.params[j].is_output === true) {
          j += 1
        }

        if (meta.params[j].is_user_defined) {
          vec[j] = params[i]
        } else {
          vec[j].val = params[i]
        }
        j += 1
      }
      return vec
    }

    function privateCall (notify, params, cb) {
      const paramVec = bindParams(meta, params)
      if (cb) {
        callStoredProcedure(notify, meta.signature, paramVec, (err, results, output, more) => {
          cb(err, results, output, more)
        })
      } else {
        callStoredProcedure(notify, meta.signature, paramVec)
      }
    }

    function callNotify (paramsOrCb, fn, notify) {
      let vec
      let cb
      if (Array.isArray(paramsOrCb)) {
        vec = paramsOrCb
        cb = fn
      } else {
        vec = []
        cb = paramsOrCb
      }

      notify.setConn(conn)
      privateCall(notify, vec, cb)
    }

    function call (paramsOrCb, fn) {
      const notify = new notifier.StreamEvents()
      callNotify(paramsOrCb, fn, notify)

      return notify
    }

    return {
      paramsArray: paramsArray,
      call: call,
      callNotify: callNotify,
      setTimeout: setTimeout,
      setPolling: setPolling,
      getMeta: getMeta,
      getName: getName
    }
  }

  function ProcedureMgr (procedureConnection, procedureNotifier, procedureDriverMgr, metaResolver) {
    const cache = {}
    const conn = procedureConnection
    let timeout = 0
    let polling = false
    const driverMgr = procedureDriverMgr
    const notifier = procedureNotifier

    function describeProcedure (procedureName, callback) {
      const ret = {
        is_output: true,
        name: '@returns',
        type_id: 'int',
        max_length: 4,
        order: 0,
        collation: null
      }

      function mapFn (sql) {
        let schemaName = 'dbo'
        let unqualifiedTableName = procedureName
        const schemaIndex = procedureName.indexOf('.')
        if (schemaIndex > 0) {
          schemaName = procedureName.substr(0, schemaIndex)
          unqualifiedTableName = procedureName.substr(schemaIndex + 1)
        }
        sql = sql.replace(/<escaped_procedure_name>/g, unqualifiedTableName)
        sql = sql.replace(/<schema_name>/g, schemaName)
        return sql
      }

      metaResolver.getProcedureDefinition(conn, procedureName, mapFn).then(results => {
        results.unshift(ret)
        callback(null, results)
      }).catch(err => {
        callback(err, null)
      })
    }

    function descp (p) {
      let s = ''
      s += `${p.name} [ ${p.type_id}${p.is_output
        ? ' out '
        : ' in '} ] `
      return s
    }

    function summarise (name, pv) {
      let s = `${descp(pv[0])} ${name}( `
      for (let i = 1; i < pv.length; i += 1) {
        s += descp(pv[i])
        if (i < pv.length - 1) {
          s += ', '
        }
      }
      s += ' ) '
      return s
    }

    function build (pv, name) {
      let q = '{ '
      const len = pv.length
      q += `? = call ${name}(`
      for (let r = 1; r < len; r += 1) {
        q += ' ?'
        if (r < len - 1) {
          q += ', '
        }
      }
      q += ') }'

      return q
    }

    function asSelect (pv, procedure) {
      const params = []
      const parameters = []
      pv.forEach(param => {
        if (param.name !== '@returns') {
          parameters.push(param)
        }
      })

      parameters.forEach(param => {
        if (param.is_output) {
          const s = `${param.name} ${param.type_id}`
          params.push(s)
        }
      })

      let cmdParam = ['@___return___ int'].concat(params).join(', ')
      let cmd = `declare ${cmdParam};`
      cmd += `exec @___return___ = ${procedure} `

      const spp = []
      parameters.forEach(param => {
        if (param.is_output) {
          // output parameter
          cmdParam = `${param.name}=${param.name} output`
          spp.push(cmdParam)
        } else {
          // input parameter
          cmdParam = param.name + '=?'
          spp.push(cmdParam)
        }
      })

      const params2 = []
      parameters.forEach(param => {
        if (param.is_output) {
          let paramName = param.name
          if (paramName[0] === '@') {
            paramName = paramName.substring(1)
          }
          cmdParam = `${param.name} as ${paramName}`
          params2.push(cmdParam)
        }
      })

      const sppJoined = spp.join(', ')
      cmd += sppJoined + ';'
      const selectCmd = `select ${['@___return___ as \'___return___\''].concat(params2).join(', ')}`
      cmd += selectCmd + ';'

      return cmd
    }

    function createProcedure (name, cb) {
      let procedure = cache[name]
      if (!procedure) {
        describeProcedure(name, (err, pv) => {
          if (!err) {
            const signature = build(pv, name)
            const select = asSelect(pv, name)
            const summary = summarise(name, pv)
            const meta = {
              select: select,
              signature: signature,
              summary: summary,
              params: pv
            }

            procedure = new BoundProcedure(driverMgr, notifier, conn, meta, name, polling, timeout)
            cache[name] = procedure
            cb(procedure)
          } else {
            cb(err)
          }
        })
      } else {
        cb(procedure)
      }
    }

    function describe (name, cb) {
      createProcedure(name, p => {
        if (p) {
          cb(p)
        } else {
          cb(new Error(`could not get definition of ${name}`))
        }
      })
    }

    function get (name, cb) {
      createProcedure(name, p => {
        cb(p)
      })
    }

    function callproc (name, paramsOrCb, cb) {
      const notify = new notifier.StreamEvents()
      createProcedure(name, p => {
        p.callNotify(paramsOrCb, cb, notify)
      })
      return notify
    }

    function setTimeout (t) {
      timeout = t
    }

    function clear () {
      Object.keys(cache).forEach(k => {
        delete cache[k]
      })
    }

    function setPolling (b) {
      polling = b
    }

    function getCount () {
      return Object.keys(cache).length
    }

    return {
      setTimeout: setTimeout,
      setPolling: setPolling,
      callproc: callproc,
      describe: describe,
      getCount: getCount,
      clear: clear,
      get: get
    }
  }

  return {
    ProcedureMgr: ProcedureMgr
  }
})())

exports_TimelordUK_node_sqlserver_v8_lib_procedure.procedureModule = procedureModule


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/queue.js
*/
'use strict'

const queueModule = ((() => {
//   const priorityQueue = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_priority_queue_PriorityQueue
  function WorkQueue () {
    const workQueue = new priorityQueue.PriorityQueue()
    let operationId = 0

    function emptyQueue () {
      while (!workQueue.isEmpty()) {
        workQueue.poll()
      }
    }

    function execQueueOp (op) {
      const peek = workQueue.peek()
      workQueue.add(op, op.operationId)
      if (!peek || peek.paused) {
        op.fn.apply(op.fn, op.args)
      }
    }

    function enqueue (commandType, fn, args) {
      const op = {
        commandType: commandType,
        fn: fn,
        args: args,
        operationId: operationId,
        paused: false
      }
      ++operationId
      execQueueOp(op)
      return op
    }

    function park (item) {
      workQueue.changePriority(item, Number.MAX_SAFE_INTEGER)
      item.paused = true
      const peek = workQueue.peek()
      if (!peek.paused) {
        nextOp()
      }
    }

    function resume (item) {
      workQueue.changePriority(item, item.operationId)
      item.paused = false
    }

    function dropItem (item) {
      return workQueue.remove(item)
    }

    function exec () {
      const op = workQueue.peek()
      if (op && !op.paused) {
        op.fn.apply(op.fn, op.args)
      }
    }

    function nextOp () {
      workQueue.remove(workQueue.peek())
      exec()
    }

    function length () {
      return workQueue.length()
    }

    function first (primitive) {
      const ops = []
      let ret = null
      while (!workQueue.isEmpty()) {
        const op = workQueue.peek()
        if (primitive(op.operationId, op)) {
          ret = op
          break
        }
        const peek = workQueue.peek()
        workQueue.remove(peek)
        ops.push(peek)
      }
      while (ops.length > 0) {
        const op = ops.pop()
        workQueue.add(op, op.operationId)
      }
      return ret
    }

    function peek () {
      return workQueue.peek()
    }

    return {
      resume: resume,
      park: park,
      peek: peek,
      exec: exec,
      first: first,
      dropItem: dropItem,
      nextOp: nextOp,
      emptyQueue: emptyQueue,
      enqueue: enqueue,
      length: length
    }
  }

  return {
    WorkQueue: WorkQueue
  }
})())

// encapsulate operation management - used by driver manager to queue work to the c++ driver.
// note that item[0] is live with the c++ and remains until the statement is complete.

exports_TimelordUK_node_sqlserver_v8_lib_queue.queueModule = queueModule


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/reader.js
*/
/**
 * Created by Stephen on 28/06/2017.
 */

// the main work horse that manages a query from start to finish by interacting with the c++

'use strict'

const readerModule = ((() => {
  function DriverRead (cppDriver, queue) {
    const native = cppDriver
    const workQueue = queue
    let useUTC = true

    const rowBatchSize = 50 /* ignored for prepared statements */
    function setUseUTC (utc) {
      useUTC = utc
    }

    function isInfo (err) {
      return err && err.sqlstate && err.sqlstate.length >= 2 && err.sqlstate.substring(0, 2) === '01'
    }

    /* route non critical info messages to its own event to prevent streams based readers from halting */
    const routeStatementError = (errors, callback, notify) => {
      if (!Array.isArray(errors)) {
        errors = [errors]
      }
      let i = 0
      errors.forEach(err => {
        const info = isInfo(err)
        if (callback && !info) {
          callback(err, null, i < errors.length - 1)
        } else {
          const ev = info ? 'info' : 'error'
          if (notify) {
            notify.emit(ev, err, i < errors.length - 1)
          } else {
            throw new Error(err)
          }
        }
        ++i
      })
    }

    function nativeGetRows (queryId, rowBatchSize) {
      return new Promise((resolve, reject) => {
        native.readColumn(queryId, rowBatchSize, (e, res) => {
          setImmediate(() => {
            if (e) {
              reject(e)
            } else {
              resolve(res)
            }
          })
        })
      })
    }

    // invokeObject.begin(queryId, query, params, onInvoke)

    function Query (notify, queue, query, params, invokeObject, callback) {
      let meta
      let rows = []
      let outputParams = []
      const queryId = notify.getQueryId()
      let queryRowIndex = 0
      let batchRowIndex = 0
      let batchData = null
      let running = true
      let paused = false
      let done = false
      let infoFromNextResult = false

      function close () {
        running = false
        workQueue.nextOp()
      }

      function emitDone () {
        setImmediate(() => {
          if (done) return
          done = true
          notify.emit('done', queryId)
        })
      }

      function dispatchInfoReturnErrors (e) {
        const infoMessages = []
        const errorMessages = []
        if (e && Array.isArray(e)) {
          e.forEach(errorOrInfo => {
            if (isInfo(errorOrInfo)) {
              infoMessages.push(errorOrInfo)
            } else {
              errorMessages.push(errorOrInfo)
            }
          })
        }
        if (errorMessages.length > 0) {
          return errorMessages
        } else if (infoMessages.length > 0) {
          routeStatementError(infoMessages, callback, notify, false)
        }
        return []
      }

      function nativeNextResult (queryId) {
        return new Promise((resolve, reject) => {
          infoFromNextResult = false
          native.nextResult(queryId, (e, res) => {
            setImmediate(() => {
              // may contain info messages e.g. raised by PRINT statements - do not want to reject these
              const errorMessages = e ? dispatchInfoReturnErrors(e) : []
              if (errorMessages.length > 0) {
                reject(errorMessages)
              } else {
                infoFromNextResult = e != null && Array.isArray(e) && e.length > 0
                resolve(res)
              }
            })
          })
        })
      }

      function beginQuery (queryId) {
        return new Promise((resolve, reject) => {
          invokeObject.begin(queryId, query, params, (e, columnDefinitions, procOutputOrMore) => {
            setImmediate(() => {
              if (e && !procOutputOrMore) {
                reject(e)
              } else {
                resolve({
                  warning: e,
                  columnDefinitions: columnDefinitions,
                  procOutput: procOutputOrMore
                })
              }
            })
          })
        })
      }

      // console.log('fetch ', queryId)
      const dispatchRows = (results) => {
        if (!results) { return }
        if (paused) return
        const resultRows = results.data
        if (!resultRows) { return }
        const numberRows = resultRows.length
        while (batchRowIndex < numberRows) {
          if (paused) {
            break
          }
          const driverRow = resultRows[batchRowIndex]
          notify.emit('row', queryRowIndex)
          batchRowIndex++
          queryRowIndex++
          let currentRow
          if (callback) {
            currentRow = []
            rows[rows.length] = currentRow
          }
          for (let column = 0; column < driverRow.length; ++column) {
            let rowColumn = driverRow[column]
            if (callback) {
              if (rowColumn && useUTC === false) {
                if (meta[column].type === 'date') {
                  rowColumn = new Date(rowColumn.getTime() - rowColumn.getTimezoneOffset() * -60000)
                }
              }
              currentRow[column] = rowColumn
            }
            notify.emit('column', column, rowColumn, false)
          }
        }
      }

      function rowsCompleted (results, more) {
        invokeObject.end(notify, outputParams, (err, r, freeMore, op) => {
          if (callback) {
            callback(err, r, freeMore, op)
          }
          if (!freeMore) {
            emitDone()
          }
        }, results, more)
      }

      function rowsAffected (nextResultSetInfo) {
        const rowCount = nextResultSetInfo.rowCount
        const preRowCount = nextResultSetInfo.preRowCount
        const moreResults = !nextResultSetInfo.endOfResults || infoFromNextResult
        notify.emit('rowcount', preRowCount)

        const state = {
          meta: null,
          rowcount: rowCount
        }

        rowsCompleted(state, moreResults)
      }

      function moveToNextResult (nextResultSetInfo) {
        setImmediate(() => {
          if (!meta) {
            rowsCompleted(
              {
                meta: meta,
                rows: rows
              },
              !nextResultSetInfo.endOfResults)
          } else if (infoFromNextResult) {
            rowsAffected(nextResultSetInfo)
            nextResult()
            return
          } else if (meta && meta.length === 0) {
            // handle the just finished result reading
            // if there was no metadata, then pass the row count (rows affected)
            rowsAffected(nextResultSetInfo)
          } else {
            rowsCompleted(
              {
                meta: meta,
                rows: rows
              },
              !nextResultSetInfo.endOfResults)
          }

          // reset for the next resultset
          meta = nextResultSetInfo.meta
          if (!meta) {
            nextResult()
            return
          }
          rows = []
          if (nextResultSetInfo.endOfResults) {
            close()
          } else {
            // if this is just a set of rows
            if (meta.length > 0) {
              notify.emit('meta', meta)
              // kick off reading next set of rows
              dispatch()
            } else {
              nextResult()
            }
          }
        })
      }

      function dispatch () {
        if (!running) return
        if (paused) return // will come back at some later stage

        nativeGetRows(queryId, rowBatchSize).then(d => {
          batchRowIndex = 0
          batchData = d
          dispatchRows(d)
          if (!d.end_rows) {
            dispatch()
          } else {
            nextResult()
          }
        }).catch(err => {
          routeStatementError(err, callback, notify, false)
          close()
        })
      }

      const nextResult = () => {
        infoFromNextResult = false
        nativeNextResult(queryId).then(nextResultSetInfo => {
          moveToNextResult(nextResultSetInfo)
        }).catch(err => {
          routeStatementError(err, callback, notify, false)
          close()
        })
      }

      function begin () {
        beginQuery(queryId, query, params).then(res => {
          if (res.warning) {
            routeStatementError(res.warning, callback, notify)
          }
          outputParams = res.outputParams
          meta = res.columnDefinitions
          if (meta.length > 0) {
            notify.emit('meta', meta)
            dispatch()
          } else {
            nextResult()
          }
        }).catch(err => {
          invokeObject.end(notify, outputParams, () => {
            if (!Array.isArray(err)) {
              err = [err]
            }
            routeStatementError(err, callback, notify)
          }, null, false)
          close()
        })
        notify.emit('submitted', query, params)
      }

      function pause () {
        paused = true
        queue.park(notify.getOperation())
      }

      function resume () {
        queue.resume(notify.getOperation())
        paused = false
        dispatchRows(batchData)
        dispatch()
      }

      return {
        begin: begin,
        pause: pause,
        resume: resume
      }
    }

    function getQuery (notify, query, params, invokeObject, callback) {
      const q = new Query(notify, workQueue, query, params, invokeObject, callback)
      notify.setQueryWorker(q)
      return q
    }

    return {
      setUseUTC: setUseUTC,
      getQuery: getQuery
    }
  }

  return {
    DriverRead: DriverRead
  }
})())

exports_TimelordUK_node_sqlserver_v8_lib_reader.readerModule = readerModule


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/sequelize/request.js
*/
'use strict'

// const EventEmitter = require('events').EventEmitter
// const uuid = require('uuid')
// const debug = require('debug')('msnodesqlv8-sequelize')

class Request extends EventEmitter {
  constructor (sql, callback) {
    super()

    this.uuid = uuid.v4()
    this.sql = sql
    this.callback = callback
    this.params = []

    debug(`creating request (${this.uuid}): ${this.sql.length > 80 ? this.sql.slice(0, 80) + '...' : this.sql}`)
  }

  static createColumn (metadata, index, data) {
    const columnMetadata = metadata[index]
    return {
      metadata: {
        colName: columnMetadata.name,
        type: {
          id: columnMetadata.sqlType
        },
        nullable: columnMetadata.nullable,
        size: columnMetadata.size
      },
      value: data
    }
  }

  addParameter (key, paramType, value, typeOptions) {
    this.params.push(value)
  }

  execute (context) {
    let metadata = null
    let currentRow = null
    let e = null
    let rowCount = 0
    let lastColumn = 0

    debug(`connection (${context.uuid}): executing request (${this.uuid})`)
    let s = this.sql
    context.requests.push(this)
    try {
      if (this.params.length > 0) {
        if (s.startsWith('INSERT')) {
          s = s.replace(/@\d+/g, '?')
        } else if (s.startsWith('UPDATE')) {
          s = s.replace(/\s*=\s*@\d+/g, ' = ?')
        }
      }
      const request = context.connection.queryRaw(s, this.params)

      request.on('meta', (meta) => {
        metadata = meta
        currentRow = [metadata.length]
        lastColumn = metadata.length - 1
      })

      request.on('column', (index, data) => {
        currentRow[index] = Request.createColumn(metadata, index, data)
        if (index === lastColumn) {
          ++rowCount
          this.emit('row', currentRow)
          currentRow = [metadata.length]
        }
      })

      request.on('error', err => {
        e = err
        context.removeRequest(this, e)
      })

      request.on('done', () => {
        context.removeRequest(this)
        if (typeof this.callback === 'function') {
          this.callback(e, rowCount)
        }
      })
    } catch (ex) {
      context.removeRequest(this, ex)
      context.close()
    }
  }
}

exports_TimelordUK_node_sqlserver_v8_lib_sequelize_request = Request


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/sequelize/connection.js
*/
'use strict'

// const EventEmitter = require('events').EventEmitter

// const debug = require('debug')('msnodesqlv8-sequelize')
// const mssql = require('msnodesqlv8')
// const uuid = require('uuid')

// const Request = exports_TimelordUK_node_sqlserver_v8_lib_sequelize_request

function detectDriver () {
  const drivers = [
    'SQL Server Native Client 14.0',
    'SQL Server Native Client 13.0',
    'SQL Server Native Client 12.0',
    'SQL Server Native Client 11.0',
    'SQL Server Native Client 10.0',
    'SQL Native Client',
    'SQL Server'
  ]
  let detectedDriver = null
  return drivers.reduce((prev, driver) => {
    return prev.then(() => {
      if (detectedDriver !== null) {
        return
      }
      return new Promise((resolve) => {
        mssql.open(`Driver=${driver};`, (err, conn) => {
          if (err) {
            if (err.message.indexOf('Neither DSN nor SERVER keyword supplied') !== -1 && detectedDriver === null) {
              detectedDriver = driver
            }
          } else {
            // Should not be possible because nothing but driver is specified.
            conn.close(() => {})
          }
          resolve()
        })
      })
    })
  }, Promise.resolve()).then(() => {
    if (detectedDriver) {
      return detectedDriver
    }
    throw new Error('driver was not specified and no driver was detected')
  })
}

class Connection extends EventEmitter {
  constructor (config) {
    super()
    this.STATE = { INITIALIZED: 1 }
    config = Object.assign({}, config, config.options)
    delete config.options

    if (!config.connectionString) {
      if (typeof config.instanceName !== 'string' || config.instanceName.match(/^MSSQLSERVER$/i)) {
        config.instanceName = ''
      }
      config.connectionString = (config.driver ? `Driver={${config.driver}};` : '') +
        `Server=${config.server ? config.server : 'localhost'}\\${config.instanceName};` +
        (config.database ? `Database=${config.database};` : '') +
        (config.trustedConnection ? 'Trusted_Connection=yes;' : `Uid=${config.userName || ''};Pwd=${config.password || ''};`)
    }

    this.uuid = uuid.v4()
    this.config = config
    this.connection = null
    this.connectionCloseFunc = null
    this.timer = null
    this.requests = []

    Promise.resolve().then(() => {
      const match = this.config.connectionString.match(/(?:^\s*Driver\s*=)|(?:;\s*Driver\s*=)/i)
      if (!match) {
        return detectDriver().then((driver) => {
          this.config.driver = driver
          this.config.connectionString = `Driver={${driver}};${this.config.connectionString}`
        })
      }
    }).then(() => {
      this.connect()
    }).catch((err) => {
      this.emit('connect', err)
    })
  }

  get closed () {
    return this.connection === null || this.connection.close !== this.connectionCloseFunc
  }

  get loggedIn () {
    return !this.closed
  }

  connect () {
    mssql.open(this.config.connectionString, (err, conn) => {
      if (!err) {
        debug(`connection (${this.uuid}): opened`)
        this.connection = conn
        this.connectionCloseFunc = conn.close
        // Poll connection to make sure it is still open.
        this.timer = setInterval(() => {
          if (this.closed) {
            this.reset()
          }
        }, 5000)
      }
      this.emit('connect', err)
    })
  }

  reset () {
    debug(`connection (${this.uuid}): reset by peer`)
    const error = new Error('connection reset by peer')
    error.code = 'ECONNRESET'
    this.emit('error', error)
  }

  close () {
    clearInterval(this.timer)
    this.timer = null
    if (this.connection !== null) {
      this.connection.close((err) => {
        this.connection = null
        this.emit('end', err)
      })
    } else {
      this.emit('end', new Error('connection already closed'))
    }
    this.requests.slice().forEach((request) => this.removeRequest(request, new Error('connection closed')))
    debug(`connection (${this.uuid}): closed`)
  }

  beginTransaction (callback, name) {
    name = name ? `[${name}]` : ''
    const request = new Request(`BEGIN TRANSACTION ${name};`, (err) => {
      if (typeof callback === 'function') {
        callback(err)
      }
    })
    request.execute(this)
  }

  commitTransaction (callback, name) {
    name = name ? `[${name}]` : ''
    const request = new Request(`COMMIT TRANSACTION ${name};`, (err) => {
      if (typeof callback === 'function') {
        callback(err)
      }
    })
    request.execute(this)
  }

  rollbackTransaction (callback, name) {
    name = name ? `[${name}]` : ''
    const request = new Request(`ROLLBACK TRANSACTION ${name};`, (err) => {
      if (typeof callback === 'function') {
        callback(err)
      }
    })
    request.execute(this)
  }

  saveTransaction (callback, name) {
    if (!name) {
      callback(new Error('name required for transaction savepoint'))
      return
    }
    name = `[${name}]`
    const request = new Request(`SAVE TRANSACTION ${name};`, (err) => {
      if (typeof callback === 'function') {
        callback(err)
      }
    })
    request.execute(this)
  }

  execSql (request) {
    request.execute(this)
  }

  removeRequest (request, error) {
    debug(`connection (${this.uuid}): removing request (${request.uuid})`)
    const index = this.requests.indexOf(request)
    if (index !== -1) {
      this.requests.splice(index, 1)
      if (error && typeof request.callback === 'function') {
        request.callback(error)
      }
    }
  }
}

exports_TimelordUK_node_sqlserver_v8_lib_sequelize_connection = Connection


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/sequelize/index.js
*/
'use strict'
/*
  thanks to https://www.npmjs.com/package/sequelize-msnodesqlv8
  this module is now included and supported as part of msnodesqlv8
 */

// const Connection = exports_TimelordUK_node_sqlserver_v8_lib_sequelize_connection
// const Request = exports_TimelordUK_node_sqlserver_v8_lib_sequelize_request

exports_TimelordUK_node_sqlserver_v8_lib_sequelize_index = {
  Connection: Connection,
  Request: Request,
  ISOLATION_LEVEL: {},
  TYPES: {}
}


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/table.js
*/
/**
 * Created by Stephen on 9/28/2015.
 */

/*
 supports bulk table operations, delete, modify and insert. Also capture table definition such that
 template sql statements can be used to insert single entries.

 this manager will ultimately become the underlying mechanism for simple "entity framework" like
 transactions i.e. working with a concrete java script type that requires efficient binding to
 the database, thus it must be robust and simple to enhance.
 */

'use strict'

const tableModule = (() => {
  function TableMgr (connection, connectionMeta, connectionUser) {
    const cache = {}
    const bulkTableManagers = {}
    const theConnection = connection
    const metaResolver = connectionMeta
    const user = connectionUser

    function describeTable (tableName) {
      const resolver = metaResolver
      return new Promise((resolve, reject) => {
        resolver.getServerVersionRes(theConnection).then(res => {
          let cat = `[${res[0].Cat}]`
          let sql

          function mapFn (data) {
            const tableParts = tableName.split(/\.(?![^[]*])/g) // Split table names like 'dbo.table1' to: ['dbo', 'table1'] and 'table1' to: ['table1']
            const table = tableParts[tableParts.length - 1] // get the table name
            let fullTableName = table
            const schema = tableParts[tableParts.length - 2] || '' // get the table schema, if missing set schema to ''
            if (tableParts.length > 2) {
              cat = tableParts[tableParts.length - 3]
            } else if (table[0] === '#') {
              cat = '[tempdb]'
              fullTableName = `${cat}.${schema}.${table}`
            }
            sql = data.replace(/<table_name>/g, table.replace(/^\[|]$/g, '').replace(/]]/g, ']')) // removes brackets at start end end, change ']]' to ']'
              .replace(/<table_schema>/g, schema.replace(/^[|]$/g, '').replace(/]]/g, ']')) // removes brackets at start end end, change ']]' to ']'
              .replace(/<escaped_table_name>/g, fullTableName) // use the escaped table name for the OBJECT_ID() function
              .replace(/<table_catalog>/g, cat) // use the escaped table name for the OBJECT_ID() function

            return sql
          }

          resolver.getTableDefinition(theConnection, res[0].MajorVersion, mapFn).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        }).catch(err => {
          reject(err)
        })
      })
    }

    /*
     based on an instance bind properties of that instance to a given table.
     Will have to allow for not all properties binding i.e. may be partial persistence - and allow for
     mappings i.e. object.myName = table.<name> or table.my_name etc.
     */

    function Meta (tableName, cols) {
      // filter out duplicate columns with the same name
      cols = cols.filter((item, pos) => cols.findIndex(col => col.name === item.name) === pos)

      function getFullName () {
        const first = cols[0]
        return `[${first.table_catalog}].[${first.table_schema}].[${first.table_name}]`
      }

      const fullTableName = cols.length > 0 && cols[0].table_catalog !== 'tempdb'
        ? getFullName()
        : tableName

      const allColumns = cols

      function readOnly (col) {
        return (col.is_identity || col.is_computed || col.is_hidden || col.generated_always_type)
      }

      function recalculateAssignableColumns () {
        return allColumns.filter(col => !readOnly(col))
      }

      function recalculatePrimaryColumns () {
        return allColumns.filter(col => col.is_primary_key)
      }

      let insertSignature
      let whereColumns
      let updateColumns
      let selectSignature
      let deleteSignature
      let updateSignature
      const assignableColumns = recalculateAssignableColumns()

      const primaryCols = recalculatePrimaryColumns()
      const primaryByName = primaryCols.reduce((agg, col) => {
        agg[col.name] = col
        return agg
      }, {})

      const colByName = allColumns.reduce((agg, col) => {
        agg[col.name] = col
        return agg
      }, {})

      function columnSet (colSubSet) {
        return `${colSubSet.map(e => `[${e.name}] = ?`).join(' and ')}`
      }

      function whereClause (colSubSet) {
        return `where ( ${columnSet(colSubSet)} )`
      }

      function columnList (colSubSet) {
        return colSubSet.map(e => `[${e.name}]`).join(', ')
      }

      function selectStatement (colSubSet) {
        return `select ${columnList(allColumns)} from ${fullTableName} ${whereClause(colSubSet)}`
      }

      function deleteStatement (colSubSet) {
        return `delete from ${fullTableName} ${whereClause(colSubSet)}`
      }

      function updateStatement (colSubSet) {
        return `update ${fullTableName} set ${columnSet(colSubSet)} ${whereClause(whereColumns)}`
      }

      function insertStatement () {
        const subSet = recalculateAssignableColumns()
        const w = subSet.map(() => '?').join(', ')
        const values = subSet.length > 0 ? ` values ( ${w} )` : ''
        return `insert into ${fullTableName} ( ${columnList(subSet)} ) ${values}`
      }

      function filteredSet (colSubSet) {
        return colSubSet.reduce((agg, c) => {
          if (Object.prototype.hasOwnProperty.call(colByName, c.name)) {
            agg.push(colByName[c.name])
          }
          return agg
        }, [])
      }

      function setWhereCols (colSubSet) {
        const subSet = filteredSet(colSubSet)
        whereColumns = subSet
        insertSignature = insertStatement()
        deleteSignature = deleteStatement(subSet)
        selectSignature = selectStatement(subSet)
        updateSignature = updateStatement(subSet)

        return selectSignature
      }

      function setUpdateCols (colSubSet) {
        const filtered = filteredSet(colSubSet)
        updateColumns = filtered
        updateSignature = updateStatement(filtered)

        return updateSignature
      }

      function recalculateUpdateColumns () {
        const assignable = recalculateAssignableColumns()
        return assignable.filter(col => !Object.prototype.hasOwnProperty.call(primaryByName, col.name))
      }

      setWhereCols(primaryCols)
      setUpdateCols(recalculateUpdateColumns())

      function getSummary () {
        return {
          insertSignature: insertSignature,
          whereColumns: whereColumns,
          updateColumns: updateColumns,
          selectSignature: selectSignature,
          deleteSignature: deleteSignature,
          updateSignature: updateSignature,
          columns: allColumns,
          primaryColumns: primaryCols,
          assignableColumns: assignableColumns,
          by_name: colByName
        }
      }

      function toString () {
        const s = getSummary()
        return JSON.stringify(s, null, 4)
      }

      // export api

      function getAllColumns () {
        return allColumns
      }

      function getInsertSignature () {
        return insertSignature
      }

      function getWhereColumns () {
        return whereColumns
      }

      function getUpdateColumns () {
        return updateColumns
      }

      function getSelectSignature () {
        return selectSignature
      }

      function getDeleteSignature () {
        return deleteSignature
      }

      function getUpdateSignature () {
        return updateSignature
      }

      function getPrimaryColumns () {
        return primaryCols
      }

      function getAssignableColumns () {
        return assignableColumns
      }

      function getColumnsByName () {
        return colByName
      }

      return {
        getAllColumns: getAllColumns,
        toString: toString,
        getSummary: getSummary,
        setWhereCols: setWhereCols,
        setUpdateCols: setUpdateCols,
        readOnly: readOnly,

        getInsertSignature: getInsertSignature,
        getSelectSignature: getSelectSignature,
        getDeleteSignature: getDeleteSignature,
        getUpdateSignature: getUpdateSignature,
        getColumnsByName: getColumnsByName,
        getWhereColumns: getWhereColumns,
        getUpdateColumns: getUpdateColumns,
        getPrimaryColumns: getPrimaryColumns,
        getAssignableColumns: getAssignableColumns
      }
    }

    function describe (name) {
      return new Promise((resolve, reject) => {
        let tableMeta = cache[name]
        if (!tableMeta) {
          describeTable(name).then(cols => {
            tableMeta = new Meta(name, cols)
            cache[name] = tableMeta
            resolve(tableMeta)
          }).catch(err => {
            reject(err)
          })
        } else {
          resolve(tableMeta)
        }
      })
    }

    function BulkTableOpMgr (m) {
      const meta = m
      let batch = 0
      let summary = meta.getSummary()

      function asTableType (name) {
        const summary = meta.getSummary()
        const columns = summary.columns

        if (!name) {
          name = `${columns[0].table_name}Type`
        }
        const cols = userTypeCols(name)
        return new user.Table(name, cols)
      }

      function userTypeCols () {
        const summary = meta.getSummary()
        const columns = summary.columns
        const cols = []
        columns.forEach(col => {
          let declaration = `${col.name} ${col.type}`
          let length = 0
          if (col.max_length > 0) {
            if (col.type === 'nvarchar') {
              length = col.max_length / 2
            } else if (col.type === 'varbinary') {
              length = col.max_length
            }
          }

          if (length > 0) {
            declaration += `(${length})`
          }
          cols.push({
            name: col.name,
            userType: declaration,
            type: {
              declaration: col.type,
              length: length
            }
          })
        })
        return cols
      }

      function asUserType (name) {
        const summary = meta.getSummary()
        const columns = summary.columns
        const cols = userTypeCols()
        const declarations = cols.map(c => c.userType).join(', ')
        // CREATE TYPE TestType AS TABLE ( a VARCHAR(50), b INT );

        if (!name) {
          name = `${columns[0].table_name}Type`
        }
        return `CREATE TYPE ${name} AS TABLE (${declarations})`
      }

      // create an object of arrays where each array represents all values
      // for the batch.

      function prepare () {
        return summary.columns.reduce((agg, col) => {
          const property = col.name
          if (Object.prototype.hasOwnProperty.call(summary.by_name, property) &&
            !meta.readOnly(summary.by_name[property])) {
            agg.keys.push(property)
            if (!Object.prototype.hasOwnProperty.call(agg.arrays_by_name, property)) {
              agg.arrays_by_name[property] = []
            }
          }
          return agg
        }, {
          keys: [],
          arrays_by_name: {}
        })
      }

      function arrayPerColumn (vec) {
        const res = prepare()
        vec.forEach(instance => {
          res.keys.reduce((agg, property) => {
            const columnValues = agg[property]
            const val = Object.prototype.hasOwnProperty.call(instance, property)
              ? instance[property]
              : null
            columnValues.push(val)
            return agg
          }, res.arrays_by_name)
        })

        return res
      }

      // if batch size is set, split the input into that batch size.

      function rowBatches (rows) {
        const batches = []
        if (batch === 0) {
          batches.push(rows)
        } else {
          let singleBatch = []
          for (let i = 0; i < rows.length; i += 1) {
            singleBatch.push(rows[i])
            if (singleBatch.length === batch) {
              batches.push(singleBatch)
              singleBatch = []
            }
          }
        }

        return batches
      }

      // driver will have to recognise this is an array of arrays where each array
      // represents all values for that particular column.

      function arrayPerColumnForCols (rows, colSubSet) {
        const colsByName = arrayPerColumn(rows).arrays_by_name
        return colSubSet.reduce((agg, col) => {
          if (Object.prototype.hasOwnProperty.call(colsByName, col.name)) {
            agg.push(colsByName[col.name])
          }
          return agg
        }, [])
      }

      // given the input array of asObjects consisting of potentially all columns, strip out
      // the sub set corresponding to the where column set.

      function whereForRowsNoBatch (sql, rows, callback) {
        const colArray = arrayPerColumnForCols(rows, summary.whereColumns)
        theConnection.query(sql, colArray, callback)
      }

      function selectRows (rows, callback) {
        const res = []
        whereForRowsNoBatch(summary.selectSignature, rows, (err, results, more) => {
          results.forEach(r => {
            res.push(r)
          })
          if (!more) {
            callback(err, res)
          }
        })
      }

      function runQuery (sql, colArray) {
        return new Promise((resolve, reject) => {
          theConnection.query(sql, colArray, (e, res) => {
            if (e) {
              reject(e)
            } else {
              resolve(res)
            }
          })
        })
      }

      function batchIterator (sql, rows, iterate) {
        return Promise.all(rowBatches(rows).map(b => runQuery(sql, iterate(b))))
      }

      function insertRows (rows, callback) {
        batchIterator(summary.insertSignature, rows, b => arrayPerColumnForCols(b, summary.assignableColumns))
          .then(res => {
            callback(null, res)
          }).catch(e => callback(e, null))
      }

      function updateRows (rows, callback) {
        batchIterator(summary.updateSignature, rows, b => arrayPerColumnForCols(b, summary.updateColumns).concat(arrayPerColumnForCols(b, summary.whereColumns)))
          .then(res => {
            callback(null, res)
          }).catch(e => callback(e, null))
      }

      function deleteRows (rows, callback) {
        batchIterator(summary.deleteSignature, rows, b => arrayPerColumnForCols(b, summary.whereColumns))
          .then(res => {
            callback(null, res)
          }).catch(e => callback(e, null))
      }

      function getMeta () {
        return meta
      }

      function setBatchSize (batchSize) {
        batch = batchSize
      }

      function setWhereCols (whereCols) {
        meta.setWhereCols(whereCols)
        summary = meta.getSummary()
      }

      function setUpdateCols (updateCols) {
        meta.setUpdateCols(updateCols)
        summary = meta.getSummary()
      }

      function getSummary () {
        return meta.getSummary()
      }

      // public api

      return {
        asTableType: asTableType,
        asUserType: asUserType,
        insertRows: insertRows,
        selectRows: selectRows,
        deleteRows: deleteRows,
        updateRows: updateRows,
        setBatchSize: setBatchSize,
        setWhereCols: setWhereCols,
        setUpdateCols: setUpdateCols,
        getMeta: getMeta,
        meta: meta,
        columns: meta.getAllColumns(),
        getSummary: getSummary
      }
    }

    function bind (table, cb) {
      describe(table).then(meta => {
        const bulkMgr = new BulkTableOpMgr(meta)
        bulkTableManagers[table] = bulkMgr
        cb(bulkMgr)
      }).catch(err => {
        cb(null, err)
      })
    }

    return {
      describe: describe,
      bind: bind
    }
  }

  return {
    TableMgr: TableMgr
  }
})()

exports_TimelordUK_node_sqlserver_v8_lib_table.tableModule = tableModule


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/user.js
*/
'use strict'

const userModule = ((() => {
  /*
 sql.UDT(value)
 sql.Geography(value)
 sql.Geometry(value)
 sql.Variant(value)
 */

  function SqlTypes () {
    // var SQL_UNKNOWN_TYPE = 0;
    // var SQL_DECIMAL = 3;
    // var SQL_INTERVAL = 10;
    // var SQL_TIMESTAMP = 11;
    // var SQL_BINARY = -2;
    // var SQL_WCHAR = -8;
    // var SQL_SS_VARIANT = -150;
    // var SQL_SS_UDT = -151;
    // var SQL_SS_XML = -152;
    const SQL_SS_TABLE = -153
    const SQL_CHAR = 1
    const SQL_NUMERIC = 2
    const SQL_INTEGER = 4
    const SQL_SMALLINT = 5
    const SQL_FLOAT = 6
    const SQL_REAL = 7
    const SQL_DOUBLE = 8
    const SQL_VARCHAR = 12
    // var SQL_LONGVARCHAR = -1;
    const SQL_VARBINARY = -3
    const SQL_LONGVARBINARY = -4
    const SQL_BIGINT = -5
    const SQL_TINYINT = -6
    const SQL_BIT = -7
    const SQL_WVARCHAR = -9
    const SQL_WLONGVARCHAR = -10
    const SQL_TYPE_DATE = 91
    const SQL_TYPE_TIMESTAMP = 93
    const SQL_SS_TIME2 = -154
    const SQL_SS_TIMESTAMPOFFSET = -155

    // currently mapped in the driver .. either through a guess by looking at type or explicitly from user

    function Bit (p) {
      return {
        sql_type: SQL_BIT,
        value: p
      }
    }

    // sql.BigInt(value)

    function BigInt (p) {
      return {
        sql_type: SQL_BIGINT,
        value: p
      }
    }

    // sql.Float(value)

    function Float (p) {
      return {
        sql_type: SQL_FLOAT,
        value: p
      }
    }

    // sql.Real(value)

    function Real (p) {
      return {
        sql_type: SQL_REAL,
        value: p
      }
    }

    // sql.Int(value)

    function Int (p) {
      return {
        sql_type: SQL_INTEGER,
        value: p
      }
    }

    // sql.SmallInt(value)

    function SmallInt (p) {
      return {
        sql_type: SQL_SMALLINT,
        value: p
      }
    }

    // sql.TinyInt(value)

    function TinyInt (p) {
      return {
        sql_type: SQL_TINYINT,
        value: p
      }
    }

    // sql.Numeric(value, [precision], [scale]) -- optional precision and scale definition

    function Numeric (p, precision, scale) {
      return {
        sql_type: SQL_NUMERIC,
        value: p,
        precision: precision > 0
          ? precision
          : 0,
        scale: scale > 0
          ? scale
          : 0
      }
    }

    // sql.Money(value) - uses underlying numeric type with driver computed precision/scale

    function Money (p) {
      return {
        sql_type: SQL_NUMERIC,
        value: p,
        precision: 0,
        scale: 0
      }
    }

    // sql.SmallMoney(value)

    function VarBinary (p) {
      return {
        sql_type: SQL_VARBINARY,
        value: p
      }
    }

    function LongVarBinary (p) {
      return {
        sql_type: SQL_LONGVARBINARY,
        value: p
      }
    }

    function WVarChar (p) {
      return {
        sql_type: SQL_WVARCHAR,
        value: p
      }
    }

    function WLongVarChar (p) {
      return {
        sql_type: SQL_WLONGVARCHAR,
        value: p
      }
    }

    // sql.DateTimeOffset(value, [scale]) -- optional scale definition

    function DateTimeOffset (p, scale, offset) {
      return {
        sql_type: SQL_SS_TIMESTAMPOFFSET,
        value: p,
        scale: scale > 0
          ? scale
          : 0,
        offset: offset > 0
          ? offset
          : 0
      }
    }

    function Double (p) {
      return {
        sql_type: SQL_DOUBLE,
        value: p
      }
    }

    // sql.Char(value, [length]) -- optional length definition

    function Char (p, precision) {
      return {
        sql_type: SQL_CHAR,
        value: p,
        precision: precision > 0
          ? precision
          : 0
      }
    }

    // sql.VarChar(value, [length]) -- optional length definition

    function VarChar (p, precision) {
      return {
        sql_type: SQL_VARCHAR,
        value: p,
        precision: precision > 0
          ? precision
          : 0
      }
    }

    // sql.Time(value, [scale]) -- optional scale definition

    function Time2 (p, scale) {
      return {
        sql_type: SQL_SS_TIME2,
        value: p,
        scale: scale > 0
          ? scale
          : 0
      }
    }

    function MyDate (p) {
      return {
        sql_type: SQL_TYPE_DATE,
        value: p
      }
    }

    function DateTime (p) {
      return {
        sql_type: SQL_TYPE_TIMESTAMP,
        value: p
      }
    }

    // fraction is not yet used by driver, this is a placeholder for potential use given
    // a JS date only holds MS resolution.  Also presents an issue of how to pass this
    // additional information back to the client.

    // sql.DateTime2(value, [scale]) -- optional scale definition

    function DateTime2 (p, scale, fraction) {
      if (!fraction && p) {
        fraction = 0
        if (Array.isArray(p)) {
          if (p.length > 0) {
            const s = p.find(o => !!o)
            if (s) {
              fraction = s.getUTCMilliseconds()
            }
          }
        } else {
          fraction = p.getUTCMilliseconds()
        }
      }
      return {
        sql_type: SQL_TYPE_TIMESTAMP,
        value: p,
        fraction: fraction,
        scale: scale > 0
          ? scale
          : 0
      }
    }

    // datetime Date round to 10 ms as fraction is not guaranteed

    function DateRound (d, scale) {
      if (!d) {
        d = new Date()
      }
      if (!scale) {
        scale = 10
      }
      const rms = Math.ceil(d.getUTCMilliseconds() / scale) * scale
      return new Date(Date.UTC(
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate(),
        d.getUTCHours(),
        d.getUTCMinutes(),
        d.getUTCSeconds(),
        rms
      ))
    }

    function TzOffsetQuery (s, offsetMinutes) {
      const offset = offsetMinutes || -new Date().getTimezoneOffset()
      return {
        query_str: s,
        query_timeout: 0,
        query_polling: false,
        query_tz_adjustment: offset
      }
    }

    function PollingQuery (s) {
      return {
        query_str: s,
        query_timeout: 0,
        query_polling: true,
        query_tz_adjustment: 0
      }
    }

    function TimeoutQuery (s, tSecs) {
      return {
        query_str: s,
        query_timeout: tSecs,
        query_polling: false,
        query_tz_adjustment: 0
      }
    }

    function fromRow (rows, c) {
      let v
      if (rows.length === 1) {
        v = rows[0][c]
      } else {
        v = []
        for (let r = 0; r < rows.length; ++r) {
          v[v.length] = rows[r][c]
        }
      }
      return v
    }

    function Table (typeName, cols) {
      const rows = []
      const columns = []
      let schema = 'dbo'
      let unqualifiedTableName = typeName
      const schemaIndex = typeName.indexOf('.')
      if (schemaIndex > 0) {
        schema = typeName.substr(0, schemaIndex)
        unqualifiedTableName = typeName.substr(schemaIndex + 1)
      }

      if (cols && Array.isArray(cols)) {
        cols.forEach(c => {
          columns.push(c)
          if (Object.prototype.hasOwnProperty.call(c, 'schema_name')) {
            schema = c.schema_name
          }
        })
      }

      function addRowsFromObjects (vec) {
        vec.forEach(v => {
          addRowFromObject(v)
        })
      }

      function addRowFromObject (o) {
        const row = []
        columns.forEach(col => {
          row.push(o[col.name])
        })
        rows.push(row)
      }

      return {
        schema: schema,
        name: unqualifiedTableName,
        rows: rows,
        columns: columns,
        addRowsFromObjects: addRowsFromObjects
      }
    }

    function TvpFromTable (p) {
      const tp = {
        sql_type: SQL_SS_TABLE,
        table_name: p.name,
        type_id: p.name,
        is_user_defined: true,
        is_output: false,
        value: p,
        table_value_param: [],
        row_count: 1,
        schema: p.schema || 'dbo'
      }
      if (Object.prototype.hasOwnProperty.call(p, 'columns') &&
        Object.prototype.hasOwnProperty.call(p, 'rows')) {
        const cols = p.columns
        const rows = p.rows
        tp.row_count = rows.length
        for (let c = 0; c < cols.length; ++c) {
          const v = fromRow(rows, c)
          const { scale, precision, type: ty } = cols[c]
          tp.table_value_param[c] = getSqlTypeFromDeclaredType({
            scale,
            precision,
            ...ty
          }, v)
        }
      }

      return tp
    }

    function getSqlTypeFromDeclaredType (dt, p) {
      switch (dt.declaration) {
        case 'char':
        case 'nchar':
          return Char(p)

        case 'varchar':
        case 'uniqueidentifier':
          return VarChar(p)

        case 'nvarchar':
          return WVarChar(p)

        case 'text':
          return VarChar(p)

        case 'int':
          return Int(p)

        case 'bigint':
          return BigInt(p)

        case 'tinyint':
          return TinyInt(p)

        case 'smallint':
          return SmallInt(p)

        case 'bit':
          return Bit(p)

        case 'float':
          return Float(p)

        case 'numeric':
          return Numeric(p, dt.precision, dt.scale)

        case 'decimal':
          return Numeric(p, dt.precision, dt.scale)

        case 'real':
          return Real(p)

        case 'date':
          return MyDate(p)

        case 'datetime':
          return DateTime(p)

        case 'datetime2':
          return DateTime2(p, dt.scale)

        case 'smalldatetime':
          return DateTime2(p)

        case 'time':
          return Time2(p)

        case 'money':
          return Money(p)

        case 'smallmoney':
          return Money(p)

        case 'binary':
        case 'hierarchyid':
        case 'varbinary':
          return VarBinary(p)

        default:
          return null
      }
    }

    return {
      TzOffsetQuery: TzOffsetQuery,
      TimeoutQuery: TimeoutQuery,
      PollingQuery: PollingQuery,
      Bit: Bit,
      BigInt: BigInt,
      Int: Int,
      TinyInt: TinyInt,
      Numeric: Numeric,
      Money: Money,
      SmallMoney: Money,
      VarBinary: VarBinary,
      UniqueIdentifier: WVarChar,
      LongVarBinary: LongVarBinary,
      Image: LongVarBinary,
      WVarChar: WVarChar,
      Double: Double,
      Decimal: Numeric,
      SmallInt: SmallInt,
      Float: Float,
      Real: Real,
      Char: Char,
      VarChar: VarChar,
      WLongVarChar: WLongVarChar,
      NChar: Char,
      NVarChar: WVarChar,
      Text: VarChar,
      NText: WVarChar,
      Xml: WVarChar,
      Time2: Time2,
      Time: Time2,
      MyDate: MyDate,
      DateTime: DateTime,
      DateTime2: DateTime2,
      DateRound: DateRound,
      SmallDateTime: DateTime2,
      DateTimeOffset: DateTimeOffset,
      TvpFromTable: TvpFromTable,
      Table: Table
    }
  }

  return {
    SqlTypes: SqlTypes
  }
})())

exports_TimelordUK_node_sqlserver_v8_lib_user.userModule = userModule


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/connection.js
*/
/**
 * Created by Stephen on 9/28/2015.
 */

'use strict'

const connectionModule = ((() => {
  // private

const cppDriver = require("./.msnodesqlv8-v1.1.8-node-v" + process.versions.modules + "-" + process.platform + "-" + process.arch + ".node");
//   const driverModule = exports_TimelordUK_node_sqlserver_v8_lib_driver.driverModule
//   const procedureModule = exports_TimelordUK_node_sqlserver_v8_lib_procedure.procedureModule
//   const notifyModule = exports_TimelordUK_node_sqlserver_v8_lib_notifier.notifyModule
//   const tableModule = exports_TimelordUK_node_sqlserver_v8_lib_table.tableModule
//   const userModule = exports_TimelordUK_node_sqlserver_v8_lib_user.userModule
//   const metaModule = exports_TimelordUK_node_sqlserver_v8_lib_meta.metaModule

  const sqlMeta = new metaModule.Meta()
  const userTypes = new userModule.SqlTypes()

  function ConnectionWrapper (driver, defCb, name) {
    const defaultCallback = defCb
    const id = name
    const driverMgr = driver
    const inst = this
    const notifier = new notifyModule.NotifyFactory()
    // var filterNonCriticalErrors = false
    let dead = false
    let useUTC = true

    function getUserTypeTable (name, callback) {
      const mapFn = sql => {
        let schemaName = 'dbo'
        let unqualifiedTableName = name
        const schemaIndex = name.indexOf('.')
        if (schemaIndex > 0) {
          schemaName = name.substr(0, schemaIndex)
          unqualifiedTableName = name.substr(schemaIndex + 1)
        }
        sql = sql.replace(/<user_type_name>/g, unqualifiedTableName)
        sql = sql.replace(/<schema_name>/g, schemaName)
        return sql
      }

      sqlMeta.getUserType(this, name, mapFn).then(res => {
        callback(null, new userTypes.Table(name, res))
      }).catch(err => {
        callback(err, null)
      })
    }

    function tableMgr () {
      return t
    }

    function setUseUTC (utc) {
      useUTC = utc
      driverMgr.setUseUTC(utc)
    }

    function procedureMgr () {
      return p
    }

    function close (immediately, callback) {
      if (dead) {
        return
      }

      // require only callback
      if (typeof immediately === 'function') {
        callback = immediately
      } else if (typeof immediately !== 'boolean' && immediately !== undefined) {
        throw new Error('[msnodesql] Invalid parameters passed to close.')
      }

      callback = callback || defaultCallback

      dead = true
      driverMgr.close(err => {
        setImmediate(() => {
          driverMgr.emptyQueue()
          callback(err)
        })
      })
    }

    function queryRawNotify (notify, queryOrObj, chunky) {
      const queryObj = notifier.validateQuery(queryOrObj, useUTC, 'queryRaw')
      driverMgr.readAllQuery(notify, queryObj, chunky.params, chunky.callback)
    }

    function queryNotify (notify, queryOrObj, chunky) {
      notifier.validateQuery(queryOrObj, useUTC, 'query')

      const onQueryRaw = (err, results, more) => {
        if (chunky.callback) {
          if (err) {
            chunky.callback(err, null, more)
          } else {
            chunky.callback(err, driverMgr.objectify(results), more)
          }
        }
      }

      if (chunky.callback) {
        return queryRawNotify(notify, queryOrObj, notifier.getChunkyArgs(chunky.params, (err, results, more) => {
          setImmediate(() => {
            onQueryRaw(err, results, more)
          })
        }))
      } else {
        queryRawNotify(notify, queryOrObj, chunky)
      }
    }

    function queryRaw (queryOrObj, paramsOrCallback, callback) {
      if (dead) {
        throw new Error('[msnodesql] Connection is closed.')
      }

      const notify = new notifier.StreamEvents()
      notify.setConn(this)
      notify.setQueryObj(queryOrObj)
      const chunky = notifier.getChunkyArgs(paramsOrCallback, callback)
      if (!chunky.callback) {
        queryRawNotify(notify, queryOrObj, chunky)
      } else {
        queryRawNotify(notify, queryOrObj, notifier.getChunkyArgs(chunky.params, (err, results, more) => {
          setImmediate(() => {
            chunky.callback(err, results, more)
          })
        }))
      }
      return notify
    }

    function query (queryOrObj, paramsOrCallback, callback) {
      if (dead) {
        throw new Error('[msnodesql] Connection is closed.')
      }

      const notify = new notifier.StreamEvents()
      notify.setConn(this)
      notify.setQueryObj(queryOrObj)
      const chunky = notifier.getChunkyArgs(paramsOrCallback, callback)
      queryNotify(notify, queryOrObj, chunky)
      return notify
    }

    function beginTransaction (callback) {
      if (dead) {
        throw new Error('[msnodesql] Connection is closed.')
      }
      callback = callback || defaultCallback

      driverMgr.beginTransaction(callback)
    }

    function cancelQuery (notify, callback) {
      if (dead) {
        throw new Error('[msnodesql] Connection is closed.')
      }

      const qo = notify.getQueryObj()
      const polling = qo.query_polling || false
      callback = callback || defaultCallback
      const paused = notify.isPaused()
      const canCancel = paused || polling
      if (!canCancel) {
        setImmediate(() => {
          callback(new Error('Error: [msnodesql] cancel only supported for statements where polling is enabled.'))
        })
      } else {
        driverMgr.cancel(notify, (e) => {
          notify.emit('done')
          callback(e)
        })
      }
    }

    function commit (callback) {
      if (dead) {
        throw new Error('[msnodesql] Connection is closed.')
      }

      callback = callback || defaultCallback

      driverMgr.commit(callback)
    }

    function rollback (callback) {
      if (dead) {
        throw new Error('[msnodesql] Connection is closed.')
      }

      callback = callback || defaultCallback

      driverMgr.rollback(callback)
    }

    // inform driver to prepare the sql statement and reserve it for repeated use with parameters.

    function PreparedStatement (preparedSignature, connection, preparedNotifier, preparedMeta) {
      const meta = preparedMeta
      const notify = preparedNotifier
      const cw = connection
      let active = true
      const signature = preparedSignature

      function getMeta () {
        return meta
      }

      function getSignature () {
        return signature
      }

      function getId () {
        return notify.getQueryId()
      }

      function preparedQuery (paramsOrCallback, callback) {
        if (!active) {
          if (callback) {
            callback(new Error('error; prepared statement has been released.'))
          }
        }
        const chunky = notifier.getChunkyArgs(paramsOrCallback, callback)

        const onPreparedQuery = (err, results, more) => {
          if (chunky.callback) {
            if (err) {
              chunky.callback(err)
            } else {
              chunky.callback(err, driverMgr.objectify(results), more)
            }
          }
        }

        if (chunky.callback) {
          driverMgr.readAllPrepared(notify, {}, chunky.params, onPreparedQuery)
        } else {
          driverMgr.readAllPrepared(notify, {}, chunky.params)
        }

        return notify
      }

      const free = callback => {
        driverMgr.freeStatement(notify, err => {
          active = false
          if (callback) {
            callback(err)
          }
        })
      }

      return {
        preparedQuery: preparedQuery,
        meta: meta,
        connection: cw,
        free: free,
        getMeta: getMeta,
        getSignature: getSignature,
        getId: getId
      }
    }

    function prepare (queryOrObj, callback) {
      const notify = new notifier.StreamEvents()
      notify.setConn(this)
      notify.setQueryObj(queryOrObj)
      const chunky = notifier.getChunkyArgs(callback)
      queryOrObj = notifier.validateQuery(queryOrObj, useUTC, 'prepare')

      const onPrepare = (err, meta) => {
        const prepared = new PreparedStatement(queryOrObj.query_str, inst, notify, meta)
        chunky.callback(err, prepared)
      }

      driverMgr.prepare(notify, queryOrObj, onPrepare)

      return notify
    }

    const publicApi = {
      id: id,
      getUserTypeTable: getUserTypeTable,
      cancelQuery: cancelQuery,
      queryNotify: queryNotify,
      queryRawNotify: queryRawNotify,
      close: close,
      queryRaw: queryRaw,
      query: query,
      beginTransaction: beginTransaction,
      commit: commit,
      rollback: rollback,
      tableMgr: tableMgr,
      procedureMgr: procedureMgr,
      prepare: prepare,
      setUseUTC: setUseUTC
    }

    const t = new tableModule.TableMgr(publicApi, sqlMeta, userTypes)
    const p = new procedureModule.ProcedureMgr(publicApi, notifier, driverMgr, sqlMeta)

    return publicApi
  }

  let nextID = 0

  function getConnectObject (p) {
    return typeof (p) === 'string'
      ? {
        conn_str: p,
        connect_timeout: 0
      }
      : p
  }

  function openFrom (parentFn, params, callback) {
    function PrivateConnection (p, cb, id) {
      const defaultCallback = err => {
        if (err) {
          throw new Error(err)
        }
      }

      let callback2 = cb
      const native = new cppDriver.Connection()
      const driverMgr = new driverModule.DriverMgr(native)
      const nf = new notifyModule.NotifyFactory()
      const connection = new ConnectionWrapper(driverMgr, defaultCallback, id)
      connection.setUseUTC(true)
      const connectObj = p

      const open = () => {
        nf.validateParameters(
          [
            {
              type: 'string',
              value: connectObj.conn_str,
              name: 'connection string'
            },
            {
              type: 'function',
              value: callback,
              name: 'callback'
            }
          ],
          parentFn
        )

        callback2 = callback2 || defaultCallback

        const queueCb = err => {
          setImmediate(() => {
            if (Array.isArray(err) && err.length === 1) {
              callback2(err[0], connection)
            } else {
              callback2(err, connection)
            }
          })
        }

        native.open(connectObj, queueCb)
      }

      this.id = connection.id
      this.connection = connection
      this.open = open

      return this
    }

    const c = new PrivateConnection(getConnectObject(params), callback, nextID)
    nextID += 1
    c.open()

    return c.connection
  }

  function queryCloseOnDone (fn, action, connectDetails, queryOrObj, paramsOrCallback, callback) {
    let thisConn
    const nf = new notifyModule.NotifyFactory()
    const args = nf.getChunkyArgs(paramsOrCallback, callback)
    const notify = new nf.StreamEvents()

    const complete = (err, res, more) => {
      if (!more && thisConn !== null) {
        thisConn.close(() => {
          notify.emit('closed', notify.getQueryId())
          if (args.callback !== null) {
            args.callback(err, res, more)
          }
        })
      } else {
        if (args.callback !== null) {
          args.callback(err, res, more)
        }
      }
    }

    const args2 = {
      params: args.params,
      callback: complete
    }

    const go = (err, conn) => {
      notify.setConn(conn)
      notify.setQueryObj(queryOrObj)
      thisConn = conn
      notify.emit('open', notify.getQueryId())
      if (err) {
        args2.callback(err, null)
      } else {
        action(conn, notify, args2)
      }
    }

    nf.validateQuery(queryOrObj, true, fn)
    openFrom(fn, connectDetails, go)
    return notify
  }

  function query (connectDetails, queryOrObj, paramsOrCallback, callback) {
    return queryCloseOnDone('query', (conn, notify, args) => conn.queryNotify(notify, queryOrObj, args), connectDetails, queryOrObj, paramsOrCallback, callback)
  }

  function queryRaw (connectDetails, queryOrObj, paramsOrCallback, callback) {
    return queryCloseOnDone('queryRaw', (conn, notify, args) => conn.queryRawNotify(notify, queryOrObj, args), connectDetails, queryOrObj, paramsOrCallback, callback)
  }

  function open (params, callback) {
    return openFrom('open', params, callback)
  }

  return {
    meta: sqlMeta,
    userTypes: userTypes,
    query: query,
    queryRaw: queryRaw,
    open: open
  }
})())

exports_TimelordUK_node_sqlserver_v8_lib_connection.connectionModule = connectionModule


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/pool.js
*/
'use strict'

const poolModule = (() => {
//   const util = require('util')
//   const connectionModule = exports_TimelordUK_node_sqlserver_v8_lib_connection.connectionModule
//   const notifyModule = exports_TimelordUK_node_sqlserver_v8_lib_notifier.notifyModule
//   const events = require('events')

  function PoolEventCaster () {
    let queryObj = null
    let paused = false
    let pendingCancel = false

    function isPaused () {
      return paused
    }

    function getQueryObj () {
      return queryObj
    }

    function getQueryId () {
      return queryObj != null ? queryObj : -1
    }

    function isPendingCancel () {
      return pendingCancel
    }

    function cancelQuery (cb) {
      if (queryObj) {
        queryObj.cancelQuery(cb)
      } else {
        pendingCancel = true
        setImmediate(() => {
          if (cb) cb()
        })
      }
    }

    function pauseQuery () {
      paused = true
      if (queryObj) {
        queryObj.pause()
      }
    }

    function resumeQuery () {
      paused = false
      if (queryObj) {
        queryObj.resume()
      }
    }

    function setQueryObj (q, chunky) {
      queryObj = q
      q.on('submitted', (d) => {
        this.emit('submitted', d)
      })

      if (!chunky.callback) {
        q.on('error', (e, more) => {
          this.emit('error', e, more)
        })
      }

      q.on('done', (r) => {
        this.emit('done', r)
      })

      q.on('row', (r) => {
        this.emit('row', r)
      })

      q.on('column', (i, v) => {
        this.emit('column', i, v)
      })

      q.on('info', (e) => {
        this.emit('info', e)
      })
    }

    this.isPendingCancel = isPendingCancel
    this.getQueryObj = getQueryObj
    this.getQueryId = getQueryId
    this.setQueryObj = setQueryObj
    this.cancelQuery = cancelQuery
    this.pauseQuery = pauseQuery
    this.resumeQuery = resumeQuery
    this.isPaused = isPaused
  }

  function Pool (opt) {
    const openPromise = util.promisify(connectionModule.open)
    const idle = []
    const parked = []
    const workQueue = []
    const pause = []
    let busyConnectionCount = 0
    let parkingConnectionCount = 0
    let opened = false
    let hbTimer = null
    let pollTimer = null
    const _this = this
    let descriptionId = 0
    let commandId = 0
    let pendingCreates = 0
    let killed = false
    const heartbeatTickMs = 250
    const notifier = new notifyModule.NotifyFactory()

    function getOpt (src, p, def) {
      if (!src) return def
      return src[p] || def
    }

    const options = {
      floor: Math.max(0, getOpt(opt, 'floor', 0)),
      ceiling: Math.max(1, getOpt(opt, 'ceiling', 4)),
      heartbeatSecs: Math.max(1, getOpt(opt, 'heartbeatSecs', 20)),
      heartbeatSql: getOpt(opt, 'heartbeatSql', 'select @@SPID as spid'),
      inactivityTimeoutSecs: Math.max(3, getOpt(opt, 'inactivityTimeoutSecs', 60)),
      connectionString: getOpt(opt, 'connectionString', '')
    }

    options.floor = Math.min(options.floor, options.ceiling)
    options.inactivityTimeoutSecs = Math.max(options.inactivityTimeoutSecs, options.heartbeatSecs)

    function newDescription (c) {
      return {
        id: descriptionId++,
        pool: this,
        connection: c,
        heartbeatSqlResponse: null,
        lastActive: new Date(),
        lastWorkItem: null,
        keepAliveCount: 0,
        recreateCount: 0,
        parkedCount: 0,
        queriesSent: 0,
        totalElapsedQueryMs: 0
      }
    }

    function parkedDescription (c) {
      if (parked.length > 0) {
        const d = parked.pop()
        d.connection = c
        d.lastWorkItem = null
        d.heartbeatSqlResponse = null
        d.lastActive = new Date()
        d.keepAliveCount = 0
        return d
      } else {
        return null
      }
    }

    function getDescription (c) {
      return parkedDescription(c) || newDescription(c)
    }

    function item (description, work) {
      const begin = new Date()
      description.lastActive = begin
      description.keepAliveCount = 0
      description.queriesSent++
      _this.emit('debug', `[${description.id}] query work id = ${work.id}, workQueue = ${workQueue.length}`)
      const query = work.raw ? description.connection.queryRaw : description.connection.query
      work.chunky = notifier.getChunkyArgs(work.paramsOrCallback, work.callback)
      const q = query(work.sql, work.paramsOrCallback, work.callback)
      work.poolNotifier.setQueryObj(q, work.chunky)
      q.on('submitted', () => {
        _this.emit('debug', `[${description.id}] submitted work id ${work.id}`)
        _this.emit('submitted', q)
        description.work = work
        setImmediate(() => {
          crank()
        })
      })

      q.on('free', () => {
        description.totalElapsedQueryMs += new Date() - begin
        checkin('work', description)
        _this.emit('debug', `[${description.id}] free work id ${work.id}`)
        work.poolNotifier.emit('free')
        setImmediate(() => {
          crank()
        })
      })

      q.on('error', (e, more) => {
        _this.emit('error', e, more)
        setImmediate(() => {
          crank()
        })
      })
    }

    function promotePause () {
      const add = []
      const start = pause.length
      while (pause.length > 0) {
        const item = pause.pop()
        if (item.isPaused) {
          add.unshift(item)
        } else {
          workQueue.push(item)
        }
      }
      while (add.length > 0) {
        pause.unshift(add.pop())
      }
      if (start !== pause.length) {
        setImmediate(() => crank())
      }
    }

    function poll () {
      if (pause.length + workQueue.length > 0) {
        crank()
      }
    }

    function crank () {
      if (killed) return
      grow().then(() => {
        promotePause()
        while (workQueue.length > 0 && idle.length > 0) {
          const work = workQueue.pop()
          if (work.poolNotifier.isPendingCancel()) {
            _this.emit('debug', `query work id = ${work.id} has been cancelled waiting in pool to execute, workQueue = ${workQueue.length}`)
            work.poolNotifier.emit('done')
            work.poolNotifier.emit('free')
          } else if (work.poolNotifier.isPaused()) {
            pause.unshift(work)
          } else {
            const description = checkout('work')
            item(description, work)
          }
        }
      })
    }

    function newWorkItem (sql, paramsOrCallback, callback, notifier, raw) {
      return {
        id: commandId++,
        sql: sql,
        paramsOrCallback: paramsOrCallback,
        callback: callback,
        poolNotifier: notifier,
        raw: raw
      }
    }

    function query (sql, paramsOrCallback, callback) {
      const notifier = new PoolEventCaster()
      enqueue(newWorkItem(sql, paramsOrCallback, callback, notifier, false))
      return notifier
    }

    function queryRaw (sql, paramsOrCallback, callback) {
      const notifier = new PoolEventCaster()
      enqueue(newWorkItem(sql, paramsOrCallback, callback, notifier, true))
      return notifier
    }

    function enqueue (item) {
      if (killed) {
        return null
      }
      workQueue.unshift(item)
      if (opened) {
        setImmediate(() => {
          crank()
        })
      }
    }

    function getStatus (work, activity, op) {
      const s = {
        time: new Date(),
        parked: parked.length,
        idle: idle.length,
        busy: busyConnectionCount,
        pause: pause.length,
        parking: parkingConnectionCount,
        workQueue: workQueue.length,
        activity: activity,
        op: op
      }
      if (work) {
        s.lastSql = work.sql
        s.lastParams = work.chunky.params
      }
      return s
    }

    function checkin (activity, description) {
      if (killed) return
      idle.unshift(description)
      if (busyConnectionCount > 0) busyConnectionCount--
      _this.emit('status', getStatus(description.work, activity, 'checkin'))
      description.work = null
      _this.emit('debug', `[${description.id}] checkin idle = ${idle.length}, parking = ${parkingConnectionCount}, parked = ${parked.length}, busy = ${busyConnectionCount}, pause = ${pause.length}, workQueue = ${workQueue.length}`)
    }

    function checkout (activity) {
      if (idle.length === 0) return null
      const description = idle.pop()
      busyConnectionCount++
      _this.emit('status', getStatus(null, activity, 'checkout'))
      _this.emit('debug', `[${description.id}] checkout idle = ${idle.length}, parking = ${parkingConnectionCount}, parked = ${parked.length}, busy = ${busyConnectionCount}, pause = ${pause.length}, workQueue = ${workQueue.length}`)
      return description
    }

    function grow () {
      const toPromise = []
      const existing = idle.length + busyConnectionCount + pendingCreates + parkingConnectionCount
      if (!killed) {
        for (let i = existing; i < options.ceiling; ++i) {
          ++pendingCreates
          toPromise.push(openPromise(options.connectionString))
        }
      }
      return Promise.all(toPromise).then(res => {
        if (res.length === 0) return
        _this.emit('debug', `grow creates ${res.length} connections for pool idle = ${idle.length}, busy = ${busyConnectionCount}, pending = ${pendingCreates}, parkingConnectionCount = ${parkingConnectionCount}, existing = ${existing}`)
        res.forEach(c => {
          checkin('grow', getDescription(c))
          --pendingCreates
        })
      })
    }

    function open (cb) {
      if (opened) {
        return
      }
      grow().then(() => {
        if (cb) cb()
        if (options.heartbeatSecs) {
          hbTimer = setInterval(() => {
            park()
            heartbeat()
          }, heartbeatTickMs, _this)
          crank()
        }
        pollTimer = setInterval(() => {
          poll()
        }, 200, _this)
        opened = true
        _this.emit('open', options)
      }).catch(e => {
        _this.emit('error', e)
      })
    }

    function park () {
      const toParkIndex = idle.findIndex(description => {
        const inactivePeriod = description.keepAliveCount * options.heartbeatSecs
        return inactivePeriod >= options.inactivityTimeoutSecs
      })
      if (toParkIndex === -1) return
      const description = idle[toParkIndex]
      if (parkDescription(description)) {
        idle.splice(toParkIndex, 1)
      }
    }

    function promoteToFront (index) {
      if (index < 0 || index >= idle.length) return
      const description = idle[index]
      idle.splice(index, 1)
      idle.push(description)
    }

    function heartbeat () {
      const toHeartBeatIndex = idle.findIndex(d => new Date() - d.lastActive >= options.heartbeatSecs * 1000)
      if (toHeartBeatIndex === -1) return
      promoteToFront(toHeartBeatIndex)
      const description = checkout('heartbeat')
      const q = description.connection.query(options.heartbeatSql)
      q.on('column', (i, v) => {
        description.heatbeatSqlResponse = v
      })
      q.on('done', () => {
        description.keepAliveCount++ // reset by user query
        description.lastActive = new Date()
        checkin('heartbeat', description)
        const inactivePeriod = description.keepAliveCount * options.heartbeatSecs
        _this.emit('debug', `[${description.id}] heartbeat response = '${description.heatbeatSqlResponse}', ${description.lastActive.toLocaleTimeString()}` +
          `, keepAliveCount = ${description.keepAliveCount} inactivePeriod = ${inactivePeriod}, inactivityTimeoutSecs = ${options.inactivityTimeoutSecs}`)
      })
      q.on('error', (e) => {
        _this.emit('error', e)
        recreate(description)
      })
    }

    function parkDescription (description) {
      // need to leave at least floor connections in idle pool
      const canPark = Math.max(0, idle.length - options.floor)
      if (canPark === 0) return false
      _this.emit('debug', `[${description.id}] close connection and park due to inactivity parked = ${parked.length}, canPark = ${canPark}`)
      parkingConnectionCount++
      const promisedClose = util.promisify(description.connection.close)
      promisedClose().then(() => {
        parkingConnectionCount--
        description.connection = null
        description.parkedCount++
        description.keepAliveCount = 0
        parked.unshift(description)
        _this.emit('debug', `[${description.id}] closed connection and park due to inactivity parked = ${parked.length}, idle = ${idle.length}, busy = ${busyConnectionCount}`)
        _this.emit('status', getStatus(null, 'parked', 'parked'))
      }).catch(e => {
        _this.emit('error', e)
      })
      return true
    }

    function recreate (description) {
      _this.emit('debug', `recreate connection [${description.id}]`)
      const toPromise = []
      if (description.connection) {
        const promisedClose = util.promisify(description.connection.close)
        toPromise.push(promisedClose)
      }
      Promise.all(toPromise).then(() => {
        openPromise(options.connectionString).then(conn => {
          description.connection = conn
          description.lastActive = new Date()
          description.heartbeatSqlResponse = null
          description.recreateCount++
          checkin('recreate', description)
        }).catch(e => {
          _this.emit('error', e)
        })
      })
    }

    function close (cb) {
      if (hbTimer) {
        clearInterval(hbTimer)
      }
      if (pollTimer) {
        clearInterval(pollTimer)
      }
      killed = true
      // any parked connection will have been closed
      while (parked.length > 0) {
        parked.pop()
      }

      while (workQueue.length > 0) {
        workQueue.pop()
      }

      const toClosePromise = idle.map(description => util.promisify(description.connection.close))
      Promise.all(toClosePromise).then(res => {
        _this.emit('debug', `closed ${res.length} connections due to pool shutdown busy = ${busyConnectionCount}`)
        _this.emit('close')
        if (cb) cb()
      }).catch(e => {
        _this.emit('error', e)
      })
    }

    this.open = open
    this.close = close
    this.query = query
    this.queryRaw = queryRaw
  }

  util.inherits(Pool, events.EventEmitter)
  util.inherits(PoolEventCaster, events.EventEmitter)

  return {
    Pool: Pool
  }
})()

exports_TimelordUK_node_sqlserver_v8_lib_pool.poolModule = poolModule


/*
file https://github.com/TimelordUK/node-sqlserver-v8/blob/v1.1.8/lib/sql.js
*/
'use strict'

// ---------------------------------------------------------------------------------------------------------------------------------
// File: sql.js
// Contents: javascript interface to Microsoft Driver for Node.js  for SQL Server
//
// Copyright Microsoft Corporation and contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//
// You may obtain a copy of the License at:
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ---------------------------------------------------------------------------------------------------------------------------------

const cw = exports_TimelordUK_node_sqlserver_v8_lib_connection.connectionModule
const pm = exports_TimelordUK_node_sqlserver_v8_lib_pool.poolModule
const us = cw.userTypes

exports_TimelordUK_node_sqlserver_v8_lib_sql.module = module

exports_TimelordUK_node_sqlserver_v8_lib_sql.query = cw.query
exports_TimelordUK_node_sqlserver_v8_lib_sql.queryRaw = cw.queryRaw
exports_TimelordUK_node_sqlserver_v8_lib_sql.open = cw.open

exports_TimelordUK_node_sqlserver_v8_lib_sql.Bit = us.Bit

exports_TimelordUK_node_sqlserver_v8_lib_sql.BigInt = us.BigInt
exports_TimelordUK_node_sqlserver_v8_lib_sql.Int = us.Int
exports_TimelordUK_node_sqlserver_v8_lib_sql.TinyInt = us.TinyInt
exports_TimelordUK_node_sqlserver_v8_lib_sql.SmallInt = us.SmallInt

// add support for user assigned length.
exports_TimelordUK_node_sqlserver_v8_lib_sql.VarBinary = us.VarBinary
exports_TimelordUK_node_sqlserver_v8_lib_sql.LongVarBinary = us.LongVarBinary
exports_TimelordUK_node_sqlserver_v8_lib_sql.Image = us.LongVarBinary

exports_TimelordUK_node_sqlserver_v8_lib_sql.Float = us.Float
exports_TimelordUK_node_sqlserver_v8_lib_sql.Numeric = us.Numeric
exports_TimelordUK_node_sqlserver_v8_lib_sql.Money = us.Money
exports_TimelordUK_node_sqlserver_v8_lib_sql.SmallMoney = us.Money

exports_TimelordUK_node_sqlserver_v8_lib_sql.WVarChar = us.WVarChar
exports_TimelordUK_node_sqlserver_v8_lib_sql.Double = us.Double
exports_TimelordUK_node_sqlserver_v8_lib_sql.Decimal = us.Numeric

exports_TimelordUK_node_sqlserver_v8_lib_sql.Real = us.Real
exports_TimelordUK_node_sqlserver_v8_lib_sql.Char = us.Char // sent as Utf8
exports_TimelordUK_node_sqlserver_v8_lib_sql.VarChar = us.VarChar // sent as Utf8
exports_TimelordUK_node_sqlserver_v8_lib_sql.NChar = us.NChar // 16 bit
exports_TimelordUK_node_sqlserver_v8_lib_sql.NVarChar = us.NVarChar // 16 bit i.e. unicode
exports_TimelordUK_node_sqlserver_v8_lib_sql.Text = us.Text
exports_TimelordUK_node_sqlserver_v8_lib_sql.NText = us.Text
exports_TimelordUK_node_sqlserver_v8_lib_sql.Xml = us.Xml // recommended to use wide 16 bit rather than char
exports_TimelordUK_node_sqlserver_v8_lib_sql.UniqueIdentifier = us.UniqueIdentifier
exports_TimelordUK_node_sqlserver_v8_lib_sql.Time = us.Time
exports_TimelordUK_node_sqlserver_v8_lib_sql.Time2 = us.Time2
exports_TimelordUK_node_sqlserver_v8_lib_sql.Date = us.MyDate
exports_TimelordUK_node_sqlserver_v8_lib_sql.DateTime = us.DateTime
exports_TimelordUK_node_sqlserver_v8_lib_sql.DateTime2 = us.DateTime2
exports_TimelordUK_node_sqlserver_v8_lib_sql.DateRound = us.DateRound
exports_TimelordUK_node_sqlserver_v8_lib_sql.SmallDateTime = us.SmallDateTime
exports_TimelordUK_node_sqlserver_v8_lib_sql.DateTimeOffset = us.DateTimeOffset
exports_TimelordUK_node_sqlserver_v8_lib_sql.WLongVarChar = us.WLongVarChar
exports_TimelordUK_node_sqlserver_v8_lib_sql.PollingQuery = us.PollingQuery
exports_TimelordUK_node_sqlserver_v8_lib_sql.TimeoutQuery = us.TimeoutQuery
exports_TimelordUK_node_sqlserver_v8_lib_sql.TzOffsetQuery = us.TzOffsetQuery

exports_TimelordUK_node_sqlserver_v8_lib_sql.Table = us.Table
exports_TimelordUK_node_sqlserver_v8_lib_sql.TvpFromTable = us.TvpFromTable
exports_TimelordUK_node_sqlserver_v8_lib_sql.Pool = pm.Pool
// let cppDriver       = exports_TimelordUK_node_sqlserver_v8_lib_build_Release_sqlserverv8_node;
// let connectionModule = exports_TimelordUK_node_sqlserver_v8_lib_connection.connectionModule;
// let cw              = exports_TimelordUK_node_sqlserver_v8_lib_connection.connectionModule;
// let heap            = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_Heap;
// let comparator      = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_heap_utils_comparator_Comparator;
let priorityQueue   = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_priority_queue_PriorityQueue;
// let minHeap         = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_priority_queue_heap_MinHeap;
// let comparator      = exports_TimelordUK_node_sqlserver_v8_lib_data_struture_priority_queue_utils_comparator_Comparator;
// let driverModule    = exports_TimelordUK_node_sqlserver_v8_lib_driver.driverModule;
// let metaModule      = exports_TimelordUK_node_sqlserver_v8_lib_meta.metaModule;
// let notifyModule    = exports_TimelordUK_node_sqlserver_v8_lib_notifier.notifyModule;
// let pm              = exports_TimelordUK_node_sqlserver_v8_lib_pool.poolModule;
// let procedureModule = exports_TimelordUK_node_sqlserver_v8_lib_procedure.procedureModule;
// let queueModule     = exports_TimelordUK_node_sqlserver_v8_lib_queue.queueModule;
// let readerModule    = exports_TimelordUK_node_sqlserver_v8_lib_reader.readerModule;
// let Connection      = exports_TimelordUK_node_sqlserver_v8_lib_sequelize_connection;
// let Request         = exports_TimelordUK_node_sqlserver_v8_lib_sequelize_request;
// let tableModule     = exports_TimelordUK_node_sqlserver_v8_lib_table.tableModule;
// let userModule      = exports_TimelordUK_node_sqlserver_v8_lib_user.userModule;
module.exports = exports_TimelordUK_node_sqlserver_v8_lib_sql;
}());


/*
file none
*/
