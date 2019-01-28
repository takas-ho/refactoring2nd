const statementMain = require('./statement');
const statement = statementMain.statement;
const htmlStatement = statementMain.htmlStatement;

test('本に乗っていたサンプル例を実行（機能性のテストはしていない）', () => {
  const plays = {
    hamlet: { name: 'Hamlet', type: 'tragedy' },
    'as-like': { name: 'As You Like It', type: 'comedy' },
    othello: { name: 'Othello', type: 'tragedy' },
  };

  const invoice = {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
      {
        playID: 'as-like',
        audience: 35,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  };

  const expected =
`Statement for BigCo
  Hamlet: $650.00 (55 seats)
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`;
  const result = statement(invoice, plays);
  expect(result).toEqual(expected);
});


test('例外が発生するケース（機能性のテストはしてない）', () => {
  const plays = {
    hamlet: { name: 'Hamlet', type: 'badType' }, // badType
  };

  const invoice = {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
    ],
  };

  expect(() => {
    statement(invoice, plays);
  }).toThrow('unknown type: badType');
});


test('カバレッジ上げる用（機能性のテストはしてない）', () => {
  const plays = {
    hamlet: { name: 'Hamlet', type: 'tragedy' },
    'as-like': { name: 'As You Like It', type: 'comedy' },
    othello: { name: 'Othello', type: 'tragedy' },
  };

  const invoice = {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 30,
      },
      {
        playID: 'as-like',
        audience: 20,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  };

  const expected =
`Statement for BigCo
  Hamlet: $400.00 (30 seats)
  As You Like It: $360.00 (20 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,260.00
You earned 14 credits
`;
  const result = statement(invoice, plays);
  expect(result).toEqual(expected);
});


test('本に乗っていたサンプル例を実行(html)（機能性のテストはしていない）', () => {
  const plays = {
    hamlet: { name: 'Hamlet', type: 'tragedy' },
    'as-like': { name: 'As You Like It', type: 'comedy' },
    othello: { name: 'Othello', type: 'tragedy' },
  };

  const invoice = {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
      {
        playID: 'as-like',
        audience: 35,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  };

  const expected =
`<h1>Statement for BigCo</h1>
<table>
<tr><th>play</th><th>seats</th><th>cost</th></tr>
  <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>
  <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>
  <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>
</table>
<p>Amount owed is <em>$1,730.00</em></p>
<p>You earned <em>47</em> credits</p>
`;
  const result = htmlStatement(invoice, plays);
  expect(result).toEqual(expected);
});
