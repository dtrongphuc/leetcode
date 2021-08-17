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
