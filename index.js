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
