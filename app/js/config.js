/* ProjectNme : ZYC18.COM Game_Hilomp 
   Author :Edwin Chen
   LastEditTime : 2016/07/29
   FileType : Javascript
*/
var gameObj = {
	startTime : 3,
    cathecticTime :3,
	debug: true,
	gameTime: 110,
	playerState: {
		name: "Mredwinchenv",
		xingbi: 100000000
	},
	autoPlayer: [
		{
			id: 'player1',
			name: 'Edwin',
			xingbi: 4000,
        },
		{
			id: 'player2',
			name: 'Jose',
			xingbi: 4340,
        },
		{
			id: 'player3',
			name: 'Edward',
			xingbi: 340,
        },
		{
			id: 'player4',
			name: 'Wenut',
			xingbi: 1240,
        },
		{
			id: 'player5',
			name: 'Ken',
			xingbi: 40,
        },
		{
			id: 'player6',
			name: 'Pael',
			xingbi: 1,
        },
    ],
	history: [
		{
			gameTime: 109,
			num1: 'dice1',
			num2: 'dice4',
			txt: '顺子'
		},
		{
			gameTime: 108,
			num1: 'dice3',
			num2: 'dice6',
			txt: '23423'
		},
		{
			gameTime: 107,
			num1: 'dice2',
			num2: 'dice5',
			txt: '当时发生的'
		}
	],
	state: 0
};
var sysObj = {
	getXingbi: 'http://www.baidu.com',
	nav: [
		{
			id: 'back',
			link: 'javascript:;',
			class: 'nav-1'
		}, {
			id: 'rule',
			link: 'javascript:;',
			class: 'nav-2'
		}
	],
	btn: [
		{
			id: '01',
			value: '100'
		},
		{
			id: '02',
			value: '200'
		},
		{
			id: '03',
			value: '500'
		},
		{
			id: '04',
			value: '1000'
		},
		{
			id: '05',
			value: '5000'
		}
	],
	rule: '一般来说，在设计类的时候，我们希望能减少重复性的代码，并且尽量弱化对象间的耦合。使用继承符合前一个设计原则的需要。借助这种机制，你可以在现有类的基础上进行设计并充分利用它们已经具备的各种方法，而对设计进行修改也更为轻松。假设你需要让几个类都拥有一个按特定方式输出类结构的toString()方法，当然可以用复制加粘贴的办法把定义toString()方法的代码添加到每一个类中，但这样做的话，每当需要改变这个方法的工作方式时，你将不得不在每一个类中重复同样的修改。反之，如果你提供了一个ToStringProvider类，然后让那些类继承这个类，那么toString这个方法只需在一个地方声明即可。让一个类继承另一个类可能会导致二者产生强耦合，也即一个类的依赖于另一个类的内部实现。我们将讨论一些有助于避免这种问题的技术，其中包括用掺元类为其他类提供方法这种技术。'
};