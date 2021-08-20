// 1.Two Sum
/*Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order. */

/*  
  Tạo 1 hashmap lưu số theo dạng value - index
  lặp qua từng phần tử trong mảng và kiềm tra xem giá trị target - giá trị hiện tại có nằm trong map hay không, nếu có thì return, không thì thêm vào set vào map
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
	let map = new Map();
	for (let i = 0; i < nums.length; i++) {
		let number = target - nums[i];
		if (map.has(number)) {
			return [map.get(number), i];
		}

		map.set(nums[i], i);
	}

	return [];
};

/* 2. Add Two Numbers
  You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

  You may assume the two numbers do not contain any leading zero, except the number 0 itself.
*/

/* Thay vì cộng như bình thường từ trái sang phải thì với bài toán này ta cộng theo chiều từ phải sang trái */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
	let head = new ListNode();
	let tail = head;
	let sum = 0;
	let carry = 0;

	while (l1 !== null || l2 !== null || sum > 0) {
		if (l1 !== null) {
			sum = sum + l1.val;
			l1 = l1.next;
		}

		if (l2 !== null) {
			sum = sum + l2.val;
			l2 = l2.next;
		}

		// sum >= 10 => nhớ 1
		if (sum >= 10) {
			carry = 1;
			sum = sum - 10;
		}
		// Thêm digit vào cuối list
		tail.next = new ListNode(sum);
		tail = tail.next;

		sum = carry;
		carry = 0;
	}

	return head.next;
};

/* 
3. Longest Substring Without Repeating Characters 

Given a string s, find the length of the longest substring without repeating characters.

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.

Tách chuỗi thành mảng, lặp qua từng chữ nếu chưa có trong chuỗi đang xét thì nối vào, nếu đã có thì tiến hành cắt chuỗi tại vị trí chữ lặp

vd: abcabcbb
i = 3
pos = 0
c = a
-> substring = bc 
*/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
	let sub = '',
		pos;

	return s.split('').reduce((max, c, i) => {
		pos = sub.indexOf(c);
		if (pos !== -1) {
			sub = sub.substring(pos + 1);
		}

		sub += c;

		return Math.max(max, sub.length);
	}, 0);
};

//4. Median of Two Sorted Arrays

//5. Longest Palindromic Substring
/* Given a string s, return the longest palindromic substring in s.
  1 <= s.length <= 1000
  s consist of only digits and English letters 
*/

/**
 * @param {string} s
 * @return {string}
 */
// 9424ms runtime
// 45.4mb memory
var longestPalindrome = function (s) {
	let subArr,
		substr,
		pos,
		i,
		arr = s.split(''),
		longest = arr[0] || '';

	for (i = 0; i < arr.length; i++) {
		pos = arr.length;
		do {
			pos = arr.lastIndexOf(arr[i], pos - 1);
			if (pos !== -1) {
				subArr = arr.slice(i, pos + 1);
				substr = subArr.join('');
				if (
					substr.length > longest.length &&
					substr ===
						subArr.reduce((reversed, character) => character + reversed, '')
				) {
					longest = substr;
				}
			}
		} while (pos > -1 && pos - i > longest.length);
	}

	return longest;
};

/**
 * @param {string} s
 * @return {string}
 */
// 168ms runtime
// 43.1mb memory
var longestPalindrome = function (s) {
	let longest = '',
		i;

	for (i = 0; i < s.length; i++) {
		let sub = findPalindromic(s, i);
		if (longest.length < sub.length) {
			longest = sub;
		}
	}

	return longest;
};

// giả sử m là vị trí cân bằng, l và r là vị trí bắt đầu từ m có chữ đối xứng
const findPalindromic = (s, m) => {
	let l = m,
		r = m;

	// 2 dòng while đầu tiên giải quyết vấn đề các kí tự trước và sau m là chuỗi các kí tự giống nhau
	while (l >= 0 && s.charAt(l - 1) === s.charAt(m)) {
		l -= 1;
	}

	while (r < s.length && s.charAt(r + 1) === s.charAt(m)) {
		r += 1;
	}

	while (l >= 0 && r < s.length && s.charAt(l) === s.charAt(r)) {
		l -= 1;
		r += 1;
	}

	return s.slice(l + 1, r);
};

//6. ZigZag Conversion
/* 
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);


1 <= s.length <= 1000
s consists of English letters (lower-case and upper-case), ',' and '.'.
1 <= numRows <= 1000
*/

// cre: Sporkyy
// 120ms runtiome
// 43.8mb memory

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
	// 1. Tạo 1 "khung" zigzag
	// vd: numRows: 4
	/* 
    0
    1   1
    2 2
    3 
   */
	const zigzag = Array.from({ length: numRows }, (v, i) => i);
	zigzag.push(...zigzag.slice(1, -1).reverse());

	// 2. Tạo 1 mảng chứa chuỗi tương ứng với từng dòng
	const rows = new Array(numRows).fill('');
	// 3. Map kí tự vào mảng
	[...s].forEach((c, i) => (rows[zigzag[i % zigzag.length]] += c));

	return rows.join('');
};

//7. Reverse Integer
/* 
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).
*/

// 92ms runtime
// 40.5mb memory
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
	let num = Math.abs(x),
		operator = Math.sign(x),
		digit,
		reverse = 0,
		result = 0,
		limit = Math.pow(2, 31);

	while (num > 0) {
		digit = num % 10;
		num = parseInt(num / 10);

		reverse = reverse * 10 + digit;
	}
	result = reverse * operator;

	if (result > limit - 1 || result < -limit) return 0;

	return result;
};

//8. String to Integer (atoi)
/* Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).

The algorithm for myAtoi(string s) is as follows:

Read in and ignore any leading whitespace.
Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
Read in next the characters until the next non-digit charcter or the end of the input is reached. The rest of the string is ignored.
Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -231 should be clamped to -231, and integers greater than 231 - 1 should be clamped to 231 - 1.
Return the integer as the final result.
Note:

Only the space character ' ' is considered a whitespace character.
Do not ignore any characters other than the leading whitespace or the rest of the string after the digits. */

//76ms 99.15% faster
// 41.1mb
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
	const regex = /^(\+|\-|){1}\d+/g;
	let num = 0,
		re,
		limit,
		i,
		operator = 1;

	re = regex.exec(s.trim()) || ['0'];
	for (i = 0; i < re[0].length; i++) {
		if (i === 0 && re[0][i] === '-') {
			operator = -1;
			continue;
		}

		if (i === 0 && re[0][i] === '+') {
			operator = 1;
			continue;
		}

		num = num * 10 + re[0].charCodeAt(i) - 48;
	}
	limit = Math.pow(2, 31);
	if (num * operator < -limit) return -limit;
	if (num * operator > limit - 1) return limit - 1;

	return num * operator;
};

//9. Palindrome Number
/* Given an integer x, return true if x is palindrome integer.

An integer is a palindrome when it reads the same backward as forward. For example, 121 is palindrome while 123 is not.

-231 <= x <= 231 - 1
*/

//208 ms, faster than 25.28%
//48.5 MB, less than 25.65%
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
	return x.toString() === x.toString().split('').reverse().join('');
};

// 180 ms, faster than 72.05%
// 47.9 MB, less than 75.87%
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
	let reverse = 0,
		operator = Math.sign(x),
		num = Math.abs(x);
	if (operator === -1) return false;

	while (num > 0) {
		reverse = reverse * 10 + (num % 10);
		num = parseInt(num / 10);
	}

	return x === reverse;
};

//10. Regular Expression Matching
/* 
Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.​​​​
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

1 <= s.length <= 20
1 <= p.length <= 30
s contains only lowercase English letters.
p contains only lowercase English letters, '.', and '*'.
It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.

*/

// refer: retarsis
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
	if (!p) {
		// nếu p đã duyệt hết, kiểm tra s còn kí tự hay không
		return !s;
	}

	// kiểm tra ký tự đầu hợp lệ
	let hasFirstMatch = !!s & (p[0] === s[0] || p[0] === '.');

	if (p[1] === '*') {
		// nếu chuỗi sau * vẫn hợp lệ với s thì tiếp tục (s, p+2) (nghĩa là p[0]* lúc này được lặp lại 0 lần)
		// nếu không, kiểm tra có khớp kí tự đầu không và tiến hành lặp với (s+1, p)
		return isMatch(s, p.slice(2)) || (hasFirstMatch && isMatch(s.slice(1), p));
	}

	// nếu kí tự đầu tiên khớp nhau thì tiếp tục với s+!, p+1
	return hasFirstMatch ? isMatch(s.slice(1), p.slice(1)) : false;
};

//11. Container With Most Water

/* 
Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.

Notice that you may not slant the container.

n == height.length
2 <= n <= 105
0 <= height[i] <= 104
*/

/* 
*ý tưởng:
- để diện tích thùng chứa là lớn nhất thì khoảng cách giữa 2 cột là lớn nhất và độ cao là lớn nhất
- khởi tạo khoảng cách là lớn nhất, chiều cao thùng chứa = chiều cao thấp hơn trong 2 cột
- tiếp tục vòng lặp bằng cách thay đổi vị trí cột có chiều cao thấp hơn (tức là sẽ đi tìm cột có chiều cao cao hơn hoặc bằng cột còn lại, bởi vì lúc này khoảng cách giữa 2 cột xét sẽ giảm dần)
*/

// 84 ms, faster than 83.40%
//47.8 MB, less than 74.48%
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
	let max = 0,
		l = 0,
		r = height.length - 1;
	while (l < r) {
		let area = (r - l) * Math.min(height[l], height[r]);

		if (area > max) max = area;

		if (height[l] > height[r]) {
			r--;
		} else {
			l++;
		}
	}

	return max;
};

//12. Integer to Roman
/* 
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9. 
X can be placed before L (50) and C (100) to make 40 and 90. 
C can be placed before D (500) and M (1000) to make 400 and 900.
Given an integer, convert it to a roman numeral.

1 <= num <= 3999
*/

//140 ms, faster than 74.58%
//45.5 MB, less than 44.84%
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
	let s = '',
		keys;
	let map = {
		I: 1,
		IV: 4,
		V: 5,
		IX: 9,
		X: 10,
		XL: 40,
		L: 50,
		XC: 90,
		C: 100,
		CD: 400,
		D: 500,
		CM: 900,
		M: 1000,
	};

	keys = Object.keys(map);
	let i = keys.length - 1;
	while (num > 0 && i >= 0) {
		let value = map[keys[i]];

		if (num >= value) {
			s += keys[i];
			num -= value;
			i++;
		}
		i--;
	}

	return s;
};

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
	let map = {
		I: 1,
		IV: 4,
		V: 5,
		IX: 9,
		X: 10,
		XL: 40,
		L: 50,
		XC: 90,
		C: 100,
		CD: 400,
		D: 500,
		CM: 900,
		M: 1000,
	};
	let i = 0,
		num = 0,
		n;

	while (i < s.length) {
		if (i + 2 < s.length && map[s.slice(i, i + 3)]) {
			n = 3;
			num += map[s.slice(i, i + 3)];
		} else if (i + 1 < s.length && map[s.slice(i, i + 2)]) {
			n = 2;
			num += map[s.slice(i, i + 2)];
		} else {
			n = 1;
			num += map[s[i]];
		}

		i += n;
	}

	return num;
};

//13. Roman to Integer
/*
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9. 
X can be placed before L (50) and C (100) to make 40 and 90. 
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer.

1 <= s.length <= 15
s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
It is guaranteed that s is a valid roman numeral in the range [1, 3999].

*/
// 164 ms, faster than 26.87%
// 44.6 MB, less than 64.47%
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
	let map = {
		I: 1,
		V: 5,
		X: 10,
		L: 50,
		C: 100,
		D: 500,
		M: 1000,
	};
	let i,
		num = 0,
		value;
	for (i = 0; i < s.length; i++) {
		value = map[s[i]] < map[s[i + 1]] ? -map[s[i]] : map[s[i]];
		num += value;
	}

	return num;
};

//14. Longest Common Prefix
/*
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lower-case English letters.
*/

//80 ms, faster than 59.74%
//40.3 MB, less than 46.40%
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
	let prefix = '',
		min = 0,
		i;
	if (strs.length === 0) return '';

	min = Math.min(...strs.map((str) => str.length));
	for (i = 0; i < min; i++) {
		let match = strs.find((str) => str[i] !== strs[0][i]);
		if (typeof match !== 'undefined') return prefix;
		prefix += strs[0][i];
	}

	return prefix;
};

//15. 3Sum
/* Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

0 <= nums.length <= 3000
-105 <= nums[i] <= 105
 */

// 148ms
// 49.5mb
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
	let arr = [],
		l,
		r,
		m,
		sum;
	if (!nums || nums.length < 3) return arr;

	//- Sắp xếp mảng tăng dần, dễ dàng kiểm soát được giá trị tiếp theo
	nums.sort((a, b) => a - b);

	// 3 biến l, m, r tương ứng left, mid, right.
	// chọn l = 0 là vị trí bắt đầu lặp, tương ứng m = l + 1 và r = length - 1
	for (l = 0; l < nums.length; l++) {
		(m = l + 1), (r = nums.length - 1);
		while (m < r) {
			sum = nums[l] + nums[m] + nums[r];

			if (sum === 0) {
				arr.push([nums[l], nums[m], nums[r]]);
				// để không bị trùng lặp thì ta sẽ bỏ qua các giá trị đã có trong mảng
				while (nums[m] === nums[m + 1]) m++;
				while (nums[r] === nums[r - 1]) r--;
				m++;
				r--;
			} else if (sum < 0) {
				m++;
			} else {
				r--;
			}
		}

		//bỏ qua trùng lặp
		while (nums[l] === nums[l + 1]) l++;
	}

	return arr;
};

//16. 3Sum Closest
/* Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution. */
/* 3 <= nums.length <= 1000
-1000 <= nums[i] <= 1000
-104 <= target <= 104 */
