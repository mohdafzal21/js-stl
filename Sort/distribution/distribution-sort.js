/**
 * Created by ldp on 2015/2/18.
 */

/*
 计数排序

 计数排序（Counting sort）是一种稳定的线性时间排序算法。计数排序使用一个额外的数组C，其中第i个元素是待排序数组A中值等于i的元素的个数。然后根据数组C来将A中的元素排到正确的位置。

 计数排序的特征

 当输入的元素是n个0到k之间的整数时，它的运行时间是Θ(n + k)。计数排序不是比较排序，排序的速度快于任何比较排序算法。
 由于用来计数的数组C的长度取决于待排序数组中数据的范围（等于待排序数组的最大值与最小值的差加上1），这使得计数排序对于数据范围很大的数组，需要大量时间和内存。例如：计数排序是用来排序0到100之间的数字的最好的算法，但是它不适合按字母顺序排序人名。但是，计数排序可以用在基数排序中的算法来排序数据范围很大的数组。
 通俗地理解，例如有10个年龄不同的人，统计出有8个人的年龄比A小，那A的年龄就排在第9位，用这个方法可以得到其他每个人的位置，也就排好了序。当然，年龄有重复时需要特殊处理（保证稳定性），这就是为什么最后要反向填充目标数组，以及将每个数字的统计减去1的原因。算法的步骤如下：
 1.找出待排序的数组中最大和最小的元素
 2.统计数组中每个值为i的元素出现的次数，存入数组C的第i项
 3.对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）
 4.反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1
 
 简要分析：
 1.计数排序仅适合于小范围的数据进行排序
 2.不能对浮点数进行排序
 3.时间复杂度为 O(n)
 4.计数排序是稳定的（排序后值相同的元素相对于原先的位置是不会发生变化的）
 */

function countingSort(sqList){
    var c = [];
    var b = [];

    // 对每个元素统计关键字比它小的元素个数
    for(var i = 0, len = sqList.length; i < len; ++i){
        for(var j = 0, count = 0; j < len; ++j)
            if(sqList[j] < sqList[i]) ++count;
        c[i] = count;
    }

    // 依次求出关键字最小，第二小。。。最大的记录
    for(i = 0; i < len; ++i){
        var min = 0;
        // 求出最小记录的下标
        for(j = 0; j < len; ++j)
            if(c[j] < c[min]) min = j;

        b[i] = sqList[min];
        // 修改该记录的c值为无穷大以便下次选取
        c[min] = Infinity;
    }

    return b;
}
exports.countingSort = countingSort;

var arr = [100, 93, 97, 92, 96, 99, 92, 89, 93, 97, 90, 94, 92, 95];
arr = countingSort(arr);
console.log(arr + '');


/**
 *
 * @param {Array} sqList 要排序的数组
 * @param {Number} k 数组中最大的元素值
 * @returns {Array}
 */
function countingSort2(sqList, k){
    var len = sqList.length;
    var c = [];
    var b = [];

    // 初始化辅助数组
    for(var i = 0; i <= k; ++i) c[i] = 0;
    // 计数数组A中值等于C数组下标的个数
    for(i = 0; i < len; ++i) c[sqList[i]]++;
    // 计数数组A中值小于等于C数组下标的个数
    for(i = 1; i <= k; ++i) c[i] += c[i - 1];
    for(i = len - 1; i >= 0; --i) {
        b[c[sqList[i]] - 1] = sqList[i];
        --c[sqList[i]];
    }

    return b;
}
exports.countingSort2 = countingSort2;

var arr = [100, 93, 97, 92, 96, 99, 92, 89, 93, 97, 90, 94, 92, 95];
arr = countingSort2(arr, 100);
console.log(arr + '');


/*
 基数排序

 基数排序（英语：Radix sort）是一种非比较型整数排序算法，其原理是将整数按位数切割成不同的数字，然后按每个位数分别比较。由于整数也可以表达字符串（比如名字或日期）和特定格式的浮点数，所以基数排序也不是只能使用于整数。基数排序的发明可以追溯到1887年赫尔曼·何乐礼在打孔卡片制表机（Tabulation Machine）上的贡献。
 它是这样实现的：将所有待比较数值（正整数）统一为同样的数位长度，数位较短的数前面补零。然后，从最低位开始，依次进行一次排序。这样从最低位排序一直到最高位排序完成以后，数列就变成一个有序序列。
 基数排序的方式可以采用LSD（Least significant digital）或MSD（Most significant digital），LSD的排序方式由键值的最右边开始，而MSD则相反，由键值的最左边开始。

 效率

 基数排序的时间复杂度是O(k·n)，其中n是排序元素个数，k是数字位数。注意这不是说这个时间复杂度一定优于O(n·log(n))，k的大小取决于数字位的选择（比如比特位数），和待排序数据所属数据类型的全集的大小；k决定了进行多少轮处理，而n是每轮处理的操作数目。
 以排序n个不同整数来举例，假定这些整数以B为底，这样每位数都有B个不同的数字，k = logB(N)，N是待排序数据类型全集的势。虽然有B个不同的数字，需要B个不同的桶，但在每一轮处理中，判断每个待排序数据项只需要一次计算确定对应数位的值，因此在每一轮处理的时候都需要平均n次操作来把整数放到合适的桶中去，所以就有：
 k约等于logB(N)
 所以，基数排序的平均时间T就是：
 T～= logB(N)·n
 其中前一项是一个与输入数据无关的常数，当然该项不一定小于logn
 如果考虑和比较排序进行对照，基数排序的形式复杂度虽然不一定更小，但由于不进行比较，因此其基本操作的代价较小，而且在适当选择的B之下，k一般不大于logn，所以基数排序一般要快过基于比较的排序，比如快速排序。

 假设我们有一些二元组(a,b)，要对它们进行以a为首要关键字，b的次要关键字的排序。我们可以先把它们先按照首要关键字排序，分成首要关键字相同的若干堆。然后，在按照次要关键值分别对每一堆进行单独排序。最后再把这些堆串连到一起，使首要关键字较小的一堆排在上面。按这种方式的基数排序称为MSD(Most Significant Dight)排序。第二种方式是从最低有效关键字开始排序，称为LSD(Least Significant Dight)排序。首先对所有的数据按照次要关键字排序，然后对所有的数据按照首要关键字排序。要注意的是，使用的排序算法必须是稳定的，否则就会取消前一次排序的结果。由于不需要分堆对每堆单独排序，LSD方法往往比MSD简单而开销小。下文介绍的方法全部是基于LSD的。

 基数排序的简单描述就是将数字拆分为个位十位百位，每个位依次排序。因为这对算法稳定要求高，所以我们对数位排序用到上一个排序方法计数排序。因为基数排序要经过d (数据长度)次排序， 每次使用计数排序， 计数排序的复杂度为 On),  d 相当于常量和N无关，所以基数排序也是 O(n)。基数排序虽然是线性复杂度， 即对n个数字处理了n次，但是每一次代价都比较高， 而且使用计数排序的基数排序不能进行原地排序，需要更多的内存， 并且快速排序可能更好地利用硬件的缓存， 所以比较起来，像快速排序这些原地排序算法更可取。对于一个位数有限的十进制数，我们可以把它看作一个多元组，从高位到低位关键字重要程度依次递减。可以使用基数排序对一些位数有限的十进制数排序。
 */

// 求数据的最大位数
function maxBit(arr){
    var d = 1;
    var p = 10;

    for(var i = 0, n = arr.length; i < n; ++i){
        while(arr[i] >= p){
            p *= 10;
            ++d;
        }
    }

    return d;
}

function radixSort(arr){
    var d = maxBit(arr);
    var n = arr.length;
    var temp = [];
    // 计数器
    var count = [];
    var radix = 1;

    // 进行d次排序
    for(var i = 1; i <= d; ++i){
        // 每次分配前清空计数器
        for(var j = 0; j < 10; ++j)
            count[j] = 0;
        // 统计每个桶中的记录数
        for(j = 0; j < n; ++j){
            var k = (arr[j] / radix | 0) % 10;
            ++count[k];
        }
        for(j = 1; j < 10; ++j)
            count[j] += count[j - 1];
        // 将所有桶中记录依次收集到tmp中
        for(j = n - 1; j >= 0; --j){
            k = (arr[j] / radix | 0) % 10;
            temp[--count[k]] = arr[j];
        }
        //将临时数组的内容复制到arr中
        for(j = 0; j < n; ++j)
            arr[j] = temp[j];

        radix *= 10;
    }
}
exports.radixSort = radixSort;

var arr = [100, 93, 97, 92, 96, 99, 92, 89, 93, 97, 90, 94, 92, 95];
radixSort(arr, 100);
console.log(arr + '');