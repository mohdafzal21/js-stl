
/**
 * 双向链表
 *
 * 双向链表是为了克服单链表这种单向性的缺点。
 * 双向链表的结点中有两个指针域，其一指向直接后继，另一指向直接前趋。
 *
 * 双向链表也可以有循环表。
 */

export class Node {
    data: any;
    prev: Node;
    next: Node;

    constructor(data: any, prev: Node = null, next: Node = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

function defaultCompare(a: any, b: any): boolean {
    return a === b;
}

export default class DoubleLinkedList {
    head: Node;
    tail: Node;
    size: number;
    compare: Function;

    constructor(sqList: Array<any> = [], compare = defaultCompare) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.compare = compare;

        if(sqList && sqList.length) {
            for (let item of sqList) {
                this.push(item);
            }
        }
    }

    *[Symbol.iterator](){
        let current = this.head;

        while (current) {
            yield current.data;

            current = current.next;
        }
    }
    
    get length() {
        return this.size;
    }

    public clear(){
        this.head = null;
        this.tail = null;
        this.size = 0;

        return true;
    }

    public push(data: any) {
        if (typeof data === 'undefined') throw new Error('param data required');

        ++this.size;

        if (!this.head) {
            this.head = this.tail = new Node(data);
        } else {
            let node = new Node(data, this.tail, null);
            this.tail.next = node;
            this.tail = node;
        }

        return data;
    }

    public unshift(data: any) {
        if (typeof data === 'undefined') throw new Error('param data required');

        ++this.size;

        if (!this.head) {
            this.head = this.tail = new Node(data);
        } else {
            let node = new Node(data, null, this.head);
            this.head.prev = node;
            this.head = node;
        }

        return data;
    }

    public pop() {
        if (!this.tail) {
            this.head = this.tail = null;
            return;
        }

        --this.size;

        let data = this.tail.data;

        this.tail.prev.next = null;
        this.tail = this.tail.prev;

        return data;
    }

    public shift() {
        if (!this.head) {
            this.head = this.tail = null;
            return;
        }

        --this.size;

        let data = this.head.data;

        this.head.next.prev = null;
        this.head = this.head.next;

        return data;
    }
    
    /**
     * update the value of existing node by index
     * @param {Number} index 
     * @param {*} data 
     */
    public update(index: number, data: any){
        let node = this.findByIndex(index, true);

        if (node) node.data = data;
        
        return !!node;
    }

    /**
     * Remove the first matched data
     * @param {*} data 
     */
    public remove(data: any) {
        if (typeof data === 'function') throw new Error('Param data required');

        let current = this.head;

        while (current) {
            if (this.compare(data, current.data)) {
                --this.size;

                if (current === this.head) {
                    this.head = this.head.next;

                    if (this.head) {
                        this.head.prev = null;
                    } else {
                        this.head = this.tail = null;
                    }

                } else if (current === this.tail) {
                    this.tail = this.tail.prev;

                    if (this.tail) {
                        this.tail.next = null;
                    } else {
                        this.head = this.tail = null;
                    }

                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }

                return current.data;
            }

            current = current.next;
        }

        return null;
    }

    public indexOf(data: any) {
        let current = this.head;
        let index = -1;

        while (current) {
            ++index;
            if (this.compare(data, current.data)) return index;

            current = current.next;
        }

        return -1;
    }

    /**
     * find node or data by index
     * @param {Number} index 
     * @param {Boolean} returnNode true: return the node object; otherwise return data;
     */
    public findByIndex(index: number = 0, returnNode?: boolean) {
        let current = this.head;
        let j = 0;

         while (current) {
             if (j++ === index) break;

             current = current.next;
         }

         return returnNode ? current : (current ? current.data : null);
    }

    public forEach(cb: Function | null = null) {
        if (typeof cb !== 'function') throw new Error('argument should be a function');

        let current = this.head;
        let index = 0;

        while (current) {
            cb(current.data, index++);

            current = current.next;
        }
    }

    public toJSON() {
        let list = [];
        let current = this.head;

        while (current) {
            list.push(current.data);

            current = current.next;
        }

        return list;
    }

    public toString() {
        return this.toJSON() + '';
    }
}


// let a = new DoubleLinkedList([2, 3]);
// a.unshift(1);
// a.push(4);
// console.log(a.indexOf(4));
// console.log(a.findByIndex(2));

// for(let item of a){
//     console.log(item);
// }

// a.pop();
// a.shift();
// a.remove(2);
// a.remove(32);
// a.remove(3);
