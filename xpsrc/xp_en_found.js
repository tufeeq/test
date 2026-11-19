/* Explainers: foundation track, English versions (keys en-fd-*), scene for scene with the Arabic ones */
(function(){ if(!window.XP||!XP.ready) return;
const POPT=['box','circle','check','cross','dot','poly','pie'];
const LIGHT=['n0','n1','n2','n3','butter','sky'], DARKF=['surface','surface2','prisoft','pinksoft'];
/* answers are written first; rotate each option list so the correct one lands in a different place */
function erot(o,a,k){ const n=o.length, r=((k%n)+n)%n; return [o.slice(r).concat(o.slice(0,r)),(a-r+n)%n]; }
function EMIX(L){ (L.quiz||[]).forEach((q,i)=>{ [q.o,q.a]=erot(q.o,q.a,L.ord+i*3+1); }); L.scenes.forEach(sc=>{ if(sc.ask) [sc.ask.opts,sc.ask.a]=erot(sc.ask.opts,sc.ask.a,L.ord*2+2); }); }
function EADD(L){ EMIX(L); L.lang='en'; L.min='2 min'; L.scenes.forEach(sc=>{ for(const k in (sc.items||{})){ const it=sc.items[k]; if(POPT.includes(it.type)&&!it.rot) it.rot=.01; if((it.type==='box'||it.type==='circle')&&LIGHT.includes(it.c)&&!it.cls) it.cls='t-note'; if(it.type==='note'&&DARKF.includes(it.c)&&!it.cls) it.cls='t-ink'; } }); XP.add(L); }
/* a board line: optional markers ! (accent), ~ (secondary, smaller), ^ (large) */
const ELY=[92,150,208,266], ENC=['n0','n1','n2','n3'];
function eline(s,y){ let sz=32, cls=null;
  for(;;){ const c=s[0]; if(c==='!'){ cls='t-pri'; s=s.slice(1); } else if(c==='~'){ cls='t-ink2'; sz=23; s=s.slice(1); } else if(c==='^'){ sz=38; s=s.slice(1); } else break; }
  const it={type:'text',dir:'ltr',x:320,y,s:sz,text:s}; if(cls) it.cls=cls; return it; }
function enote(t,y,i){ return {type:'note',x:320,y,w:Math.min(600,Math.max(220,t.length*11+70)),h:52,c:ENC[i%4],text:t,size:21,rot:i%2?-1.2:1.2}; }
/* a scene from [title, [[say, lines[], note?], …]]; lines stack down the board and the board clears when it is full */
function escene([t,beats],slots=ELY){ const items={}, out=[]; let slot=0, on=[], k=0, nk=0;
  beats.forEach(([say,lines=[],note])=>{ const b={say,show:[]};
    if(slot+lines.length>slots.length){ b.hide=on.slice(); on=[]; slot=0; }
    lines.forEach(l=>{ const id='l'+(k++); items[id]=eline(l,slots[slot++]); b.show.push(id); on.push(id); });
    if(note){ const old=on.filter(x=>x[0]==='n'); if(old.length){ b.hide=(b.hide||[]).concat(old); on=on.filter(x=>x[0]!=='n'); } const id='n'+(nk++); items[id]=enote(note,322,nk); b.show.push(id); on.push(id); }
    out.push(b); });
  return {t,items,beats:out}; }
/* the closing "your turn" scene: the question high on the board, the option buttons below it, then the worked answer */
function eask(t,beats,A){ const sc=escene([t,beats],[84,130]); sc.items.ans=eline('!'+A.ans,208); sc.items.tip=enote(A.tip,300,1);
  sc.ask={opts:A.o,a:A.a,right:A.r,wrong:A.w,show:['ans','tip'],ltr:true}; return sc; }
function EB(sc,A){ return {goals:sc.map(s=>s[0]).concat(['Apply it to a question']),scenes:sc.map(s=>escene(s)).concat([eask(A.t||'Your turn',A.b,A)])}; }

/* ===================== unit 1: numbers ===================== */
EADD({ key:'en-fd-n-ops', sk:'found', ord:1, title:'Operations and their order', ...EB([
  ['Why a fixed order?',[
    ['Start with this: two plus three times four. What do you get?',['^2 + 3 × 4']],
    ['Working straight through gives five times four, which is twenty. That is a common mistake.',['~5 × 4 = 20 ✗']],
    ['Multiplying comes first: three times four is twelve, then add two to get fourteen.',['!3 × 4 = 12, 12 + 2 = 14']]]],
  ['The four-step ladder',[
    ['Put the operations on a ladder of four steps: brackets first, then powers.',['1. Brackets','2. Powers']],
    ['Then multiplying and dividing, in the order they appear. Last, adding and subtracting, in the order they appear.',['3. Multiply and divide','4. Add and subtract']],
    ['That phrase, in the order they appear, matters: if a division comes before a multiplication, do it first.',[],'× and ÷: whichever comes first']]],
  ['Signs',[
    ['When you multiply or divide, two matching signs give a positive. Negative four times negative three is twelve.',['(−4) × (−3) = 12']],
    ['And two different signs give a negative.',['(−12) ÷ 3 = −4']],
    ['Subtracting a negative is adding: five minus negative three is eight.',['!5 − (−3) = 5 + 3 = 8'],'minus a negative = plus']]]],
  { b:[['Your turn. What is twelve plus eighteen divided by three, times two?',['^12 + 18 ÷ 3 × 2']]],
    o:['20','24','14','60'], a:1, ans:'12 + 6 × 2 = 24', tip:'Adding is the last step',
    r:'Well done. Divide first to get six, times two is twelve, then add twelve to get twenty-four.',
    w:'Divide and multiply before you add: eighteen over three is six, times two is twelve, then add twelve to get twenty-four.' }),
  quiz:[
    {q:'What is 8 − 2 × 3?', o:['2','18','0','6'], a:0, e:'Multiply first: 8 − 6 = 2.'},
    {q:'The product of two negative numbers is:', o:['positive','negative','zero','it depends on the numbers'], a:0, e:'The signs match, so the result is positive.'},
    {q:'What is 44 × 25?', o:['1100','1000','880','1144'], a:0, e:'44 × 100 ÷ 4 = 1100.'}]});

EADD({ key:'en-fd-n-frac1', sk:'found', ord:2, title:'Fractions (1): meaning, simplifying, comparing', ...EB([
  ['What is a fraction?',[
    ['A fraction is part of a whole. We cut the whole into equal parts, and the bottom number counts those parts.',['^3/4','~bottom 4: the whole cut into four parts']],
    ['The top number counts the parts we take. In three quarters we took three parts out of four.',['~top 3: we take three of them']]]],
  ['Simplifying',[
    ['To simplify a fraction, divide the top and the bottom by the largest number that goes into both.',['^18/24']],
    ['Six goes into eighteen and into twenty-four, so the fraction becomes three quarters.',['~18 ÷ 6 = 3, 24 ÷ 6 = 4','!= 3/4']],
    ['Answer choices on the test come in simplest form, so don’t stop halfway.',[],'simplify all the way']]],
  ['Comparing',[
    ['Which is bigger: five eighths, or seven elevenths? Cross-multiply.',['^5/8 ? 7/11']],
    ['Five times eleven is fifty-five, and seven times eight is fifty-six. So seven elevenths is bigger.',['~5 × 11 = 55','~7 × 8 = 56','!7/11 is bigger']]]]],
  { b:[['Your turn. What is two fifths of forty-five?',['^2/5 of 45']]],
    o:['18','9','20','90'], a:0, ans:'45 ÷ 5 × 2 = 18', tip:'Divide by the bottom, times the top',
    r:'Well done. Forty-five over five is nine, and nine times two is eighteen.',
    w:'Divide by the bottom, then multiply by the top: forty-five over five is nine, and nine times two is eighteen.' }),
  quiz:[
    {q:'The simplest form of 36/48 is:', o:['3/4','6/8','9/12','2/3'], a:0, e:'Divide both by 12.'},
    {q:'Which is bigger: 3/4 or 2/3?', o:['3/4','2/3','they are equal','cannot be compared'], a:0, e:'3 × 3 = 9 and 2 × 4 = 8.'},
    {q:'What is 3/4 of 20?', o:['15','5','12','16'], a:0, e:'20 ÷ 4 × 3 = 15.'}]});

EADD({ key:'en-fd-n-frac2', sk:'found', ord:3, title:'Fractions (2): operations', ...EB([
  ['Adding and subtracting',[
    ['You can’t add two fractions until their bottoms match. A quarter plus two thirds: the common bottom is twelve.',['^1/4 + 2/3']],
    ['A quarter is three twelfths, two thirds is eight twelfths, and together they make eleven twelfths.',['!3/12 + 8/12 = 11/12']],
    ['Never add the bottoms: a half plus a third is not two fifths.',[],'bottoms are never added']]],
  ['Multiplying and dividing',[
    ['To multiply: top times top, bottom times bottom. Three quarters times eight ninths is two thirds.',['!3/4 × 8/9 = 2/3']],
    ['To divide: flip the second fraction, then multiply.',['^2/3 ÷ 4/9','!2/3 × 9/4 = 3/2']]]],
  ['Part of what is left',[
    ['A classic: Sam spent a quarter of his money, then a third of what was left. How much is left?',['~a quarter, then a third of the rest']],
    ['After the quarter, three quarters remain. After a third of that, two thirds of it remain. So three quarters times two thirds: a half.',['!3/4 × 2/3 = 1/2']],
    ['So if sixty riyals are left, he started with one hundred and twenty.',[],'left 60 → total 120']]]],
  { b:[['Your turn. What is five sixths minus three eighths?',['^5/6 − 3/8']]],
    o:['11/24','2/14','1/3','29/24'], a:0, ans:'20/24 − 9/24 = 11/24', tip:'Match the bottoms, then subtract the tops',
    r:'Well done. The common bottom is twenty-four, and twenty minus nine is eleven.',
    w:'Match the bottoms first: five sixths is twenty twenty-fourths, three eighths is nine, and the difference is eleven twenty-fourths.' }),
  quiz:[
    {q:'What is 1/2 + 1/3?', o:['5/6','2/5','1/6','2/6'], a:0, e:'Bottom 6: 3/6 + 2/6 = 5/6.'},
    {q:'What is 6 ÷ 1/2?', o:['12','3','6','1/12'], a:0, e:'Flip and multiply: 6 × 2 = 12.'},
    {q:'Omar spent half his money, then half of the rest, and has 50 riyals left. How much did he have?', o:['200','100','150','250'], a:0, e:'1/2 × 1/2 = 1/4 is left, so 50 × 4 = 200.'}]});

EADD({ key:'en-fd-n-dec', sk:'found', ord:4, title:'Decimals and conversions', ...EB([
  ['Three forms of one value',[
    ['A fraction, a decimal and a percent are three ways to write the same value.',['^1/4 = 0.25 = 25%']],
    ['Learn these pairs, they come up all the time: a half is fifty percent, a fifth is twenty percent, and an eighth is twelve and a half percent.',['~1/2 = 50%','~1/5 = 20%','~1/8 = 12.5%']]]],
  ['Multiplying',[
    ['To multiply decimals, multiply the digits as if they were whole numbers.',['^0.3 × 0.02','~3 × 2 = 6']],
    ['Then count the decimal places in both numbers: one and two, so three places. The answer is six thousandths.',['!= 0.006'],'places in the answer = places in both']]],
  ['Dividing',[
    ['To divide, make the number you divide by a whole number: multiply both by one hundred.',['^1.2 ÷ 0.04','~multiply both by 100']],
    ['That gives one hundred and twenty over four, which is thirty.',['!120 ÷ 4 = 30']]]]],
  { b:[['Your turn. Which of these numbers is the largest?',['^0.5, 0.45, 3/8, 0.125']]],
    o:['0.5','0.45','3/8','0.125'], a:0, ans:'0.50 > 0.45', tip:'Match the decimal places, then compare',
    r:'Well done. A half is fifty hundredths, which beats forty-five hundredths.',
    w:'Match the decimal places: five tenths is fifty hundredths, so it is the largest. A longer number isn’t always a bigger one.' }),
  quiz:[
    {q:'What is 0.5 × 0.5?', o:['0.25','2.5','0.025','1'], a:0, e:'One place and one place: two places, so 0.25.'},
    {q:'The fraction 3/8 equals:', o:['37.5%','3.8%','38%','0.375%'], a:0, e:'3 ÷ 8 = 0.375 = 37.5%.'},
    {q:'What is 0.9 ÷ 0.03?', o:['30','3','0.3','300'], a:0, e:'Multiply by 100: 90 ÷ 3 = 30.'}]});

EADD({ key:'en-fd-n-exp', sk:'found', ord:5, title:'Exponents and their laws', ...EB([
  ['What an exponent means',[
    ['The exponent tells you how many times a number is multiplied by itself: two to the fifth means five twos multiplied together.',['2⁵ = 2 × 2 × 2 × 2 × 2','!= 32']]]],
  ['Multiplying and dividing',[
    ['When you multiply equal bases, add the exponents: two cubed, times two to the fourth, is two to the seventh.',['2³ × 2⁴ = 2⁷']],
    ['When you divide, subtract them: two to the seventh, over two to the fourth, is two cubed.',['2⁷ ÷ 2⁴ = 2³']],
    ['And a power of a power, multiply: two cubed, all squared, is two to the sixth.',['(2³)² = 2⁶'],'×: add · ÷: subtract · power of power: multiply']]],
  ['Zero and negatives',[
    ['Any number except zero, to the power zero, is one.',['7⁰ = 1']],
    ['A negative exponent means flip it: two to the minus three is one eighth.',['2⁻³ = 1/8'],'negative exponent = flip']]],
  ['One base',[
    ['The key skill here: write the numbers with one base. Nine is three squared, and twenty-seven is three cubed.',['9 = 3²','27 = 3³']],
    ['So if nine to the x equals twenty-seven, then two x equals three, and x is three halves.',['!2x = 3, x = 3/2']]]]],
  { b:[['Your turn. Two to the fifth, times two cubed, over two to the sixth. What do you get?',['^2⁵ × 2³ ÷ 2⁶']]],
    o:['4','2','8','16'], a:0, ans:'2⁵⁺³⁻⁶ = 2² = 4', tip:'×: add exponents · ÷: subtract them',
    r:'Well done. Five plus three minus six is two, and two squared is four.',
    w:'Add the exponents you multiply and subtract the one you divide: five plus three minus six is two, and two squared is four.' }),
  quiz:[
    {q:'What is 3⁴ + 3⁴ + 3⁴?', o:['3⁵','3¹²','9⁴','3⁷'], a:0, e:'Three equal terms: 3 × 3⁴ = 3⁵.'},
    {q:'What is 5⁰?', o:['1','0','5','undefined'], a:0, e:'Any nonzero number to the power 0 is 1.'},
    {q:'What is 2⁻²?', o:['1/4','4','1/2','2'], a:0, e:'A negative exponent flips: 1 ÷ 2² = 1/4.'}]});

EADD({ key:'en-fd-n-root', sk:'found', ord:6, title:'Roots', ...EB([
  ['A root undoes a square',[
    ['A square root undoes squaring: the square root of forty-nine is seven, because seven times seven is forty-nine.',['^√49 = 7']],
    ['Learn the squares up to twenty; they are the key to speed here and in geometry.',[],'know the squares up to 20']]],
  ['Simplifying',[
    ['To simplify a root, find the largest square that divides the number. For seventy-two, that is thirty-six.',['√72 = √36 × √2']],
    ['The root of thirty-six is six, so the answer is six root two.',['!= 6√2']]]],
  ['Adding',[
    ['You can only add like roots, the way you add like terms: three root two plus five root two is eight root two.',['3√2 + 5√2 = 8√2']],
    ['But a root doesn’t split over a sum: the root of nine plus sixteen is the root of twenty-five, which is five, not seven.',['√(9 + 16) = √25 = 5'],'a root does not split over +']]]],
  { b:[['Your turn. What is the square root of eighteen plus the square root of eight?',['^√18 + √8']]],
    o:['5√2','√26','6√2','2√13'], a:0, ans:'3√2 + 2√2 = 5√2', tip:'Simplify each root, then add like ones',
    r:'Well done. Root eighteen is three root two, root eight is two root two, and together they make five root two.',
    w:'Simplify each root first: three root two and two root two. Then add them: five root two.' }),
  quiz:[
    {q:'What is √0.09?', o:['0.3','0.03','3','0.09'], a:0, e:'0.3 × 0.3 = 0.09.'},
    {q:'The square root of 50 lies between:', o:['7 and 8','6 and 7','8 and 9','25 and 26'], a:0, e:'49 < 50 < 64.'},
    {q:'What is √(9 + 16)?', o:['5','7','25','12'], a:0, e:'√25 = 5; a root does not split over a sum.'}]});

EADD({ key:'en-fd-n-div', sk:'found', ord:7, title:'Divisibility and primes', ...EB([
  ['Quick divisibility rules',[
    ['Does a number divide by three or by nine? Add its digits.',['^5832','~5 + 8 + 3 + 2 = 18']],
    ['The sum, eighteen, divides by nine, so the number divides by nine and by three.',['!divisible by 9']],
    ['For four, look at the last two digits. For five, it just has to end in zero or five.',[],'4: last two digits · 5: ends in 0 or 5']]],
  ['Prime numbers',[
    ['A prime number divides only by itself and one, like two, three, five, seven and eleven.',['^2, 3, 5, 7, 11, 13']],
    ['One is not prime. And watch out for numbers that look prime but aren’t: fifty-one, and ninety-one.',['~51 = 3 × 17','~91 = 7 × 13']]]],
  ['Together again',[
    ['One light flashes every four seconds, another every six. When do they flash together?',['^4 and 6']],
    ['We want the least common multiple, which is twelve. So they flash together every twelve seconds.',['!LCM = 12'],'together again → least common multiple']]]],
  { b:[['Your turn. Which of these numbers is prime?',['^51, 57, 59, 91']]],
    o:['59','51','57','91'], a:0, ans:'59 is prime', tip:'Try 3 and 7 before you decide',
    r:'Well done. Fifty-nine divides only by itself and one.',
    w:'Test them: fifty-one and fifty-seven divide by three, and ninety-one by seven. That leaves fifty-nine.' }),
  quiz:[
    {q:'Which number is divisible by 9?', o:['477','484','322','555'], a:0, e:'4 + 7 + 7 = 18.'},
    {q:'What is the least common multiple of 6 and 8?', o:['24','48','12','2'], a:0, e:'24 is the smallest number divisible by 6 and 8.'},
    {q:'How many positive divisors does 12 have?', o:['6','4','5','12'], a:0, e:'1, 2, 3, 4, 6, 12.'}]});

/* ===================== unit 2: arithmetic ===================== */
EADD({ key:'en-fd-a-ratio', sk:'found', ord:8, title:'Ratio and proportion', ...EB([
  ['What a ratio means',[
    ['A ratio compares two amounts: if boys to girls is three to five, the group is eight equal parts.',['^3 : 5','~3 + 5 = 8 parts']],
    ['If the total is forty, one part is five, so there are fifteen boys and twenty-five girls.',['!40 ÷ 8 = 5','~boys 15, girls 25']]]],
  ['Direct or inverse?',[
    ['In direct proportion both amounts grow together: three pens cost twelve riyals, so seven cost twenty-eight.',['^3 pens → 12 riyals','!12 ÷ 3 × 7 = 28']],
    ['In inverse proportion one grows as the other shrinks: six workers take fifteen days, so nine workers take ten.',['~6 × 15 = 90','!90 ÷ 9 = 10']],
    ['Always ask yourself: does more of this mean more of the other, or less?',[],'inverse: the product stays fixed']]]],
  { b:[['Your turn. Seventy-two riyals are shared in the ratio four to five. How much is the larger share?',['^72 in the ratio 4 : 5']]],
    o:['40','32','45','36'], a:0, ans:'72 ÷ 9 × 5 = 40', tip:'total ÷ number of parts',
    r:'Well done. There are nine parts, each worth eight, and the larger share is five parts: forty.',
    w:'Add the parts first: four and five make nine. Seventy-two over nine is eight, and five parts make forty.' }),
  quiz:[
    {q:'5 workers finish a job in 12 days. How many days do 10 workers take?', o:['6','24','10','8'], a:0, e:'Inverse: 5 × 12 = 60, and 60 ÷ 10 = 6.'},
    {q:'4 notebooks cost 20 riyals. How much do 9 cost?', o:['45','36','29','40'], a:0, e:'One costs 5 riyals: 9 × 5 = 45.'},
    {q:'In a ratio of 3 : 7 the shares differ by 20. What is the total?', o:['50','70','100','30'], a:0, e:'The difference is 4 parts = 20, so a part is 5 and the total, 10 parts, is 50.'}]});

EADD({ key:'en-fd-a-pct', sk:'found', ord:9, title:'Percent', ...EB([
  ['A percent is a fraction',[
    ['A percent is a fraction out of a hundred. Twenty-five percent is a quarter, and twenty percent is a fifth.',['^25% = 1/4','^20% = 1/5']],
    ['So twenty-five percent of eighty is a quarter of eighty: twenty.',['!80 ÷ 4 = 20']]]],
  ['Build from ten',[
    ['Ten percent means divide by ten, and you can build any percent from it.',['^10% of 80 = 8']],
    ['Thirty-five percent of eighty: thirty percent is twenty-four, five percent is four, and together that is twenty-eight.',['~30% = 24, 5% = 4','!35% = 28']]]],
  ['Percent change',[
    ['A price went up from forty to fifty. The difference is ten.',['^40 → 50']],
    ['Always divide the difference by the old value: ten over forty, so twenty-five percent.',['!10 ÷ 40 = 25%'],'divide by the old value']]]],
  { b:[['Your turn. Forty percent of a number is eighteen. What is the number?',['^40% of n = 18']]],
    o:['45','7.2','36','54'], a:0, ans:'18 ÷ 0.4 = 45', tip:'whole = part ÷ percent',
    r:'Well done. Forty percent is two fifths, and eighteen over two fifths is forty-five.',
    w:'To find the whole, divide the part by the percent: eighteen over four tenths is forty-five.' }),
  quiz:[
    {q:'What is 15% of 360?', o:['54','36','45','60'], a:0, e:'10% = 36 and 5% = 18, total 54.'},
    {q:'A price fell from 50 to 40. By what percent?', o:['20%','25%','10%','40%'], a:0, e:'10 ÷ 50 = 20%.'},
    {q:'What is 8% of 50?', o:['4','40','0.4','8'], a:0, e:'Swap them: 50% of 8 = 4.'}]});

EADD({ key:'en-fd-a-profit', sk:'found', ord:10, title:'Profit, loss and discount', ...EB([
  ['Profit on cost',[
    ['A trader bought an item for two hundred and fifty riyals and sold it for three hundred. His profit is fifty.',['^300 − 250 = 50']],
    ['Profit percent is worked out on the cost, not the selling price: fifty over two hundred and fifty, which is twenty percent.',['!50 ÷ 250 = 20%'],'profit percent is on the cost']]],
  ['The price before a discount',[
    ['After a twenty-five percent discount, a bag costs one hundred and eighty riyals. What was the original price?',['^price after discount = 180']],
    ['After the discount you pay seventy-five percent, so divide one hundred and eighty by seventy-five hundredths: two hundred and forty.',['!180 ÷ 0.75 = 240']],
    ['Don’t add twenty-five percent to one hundred and eighty. That gives two hundred and twenty-five, which is wrong.',['~180 × 1.25 = 225 ✗']]]],
  ['Two discounts in a row',[
    ['Twenty percent off, then ten percent off the new price. Is that thirty percent off?',['^20% then 10%']],
    ['No. Multiply eight tenths by nine tenths: you pay seventy-two percent, so the discount is twenty-eight percent.',['!0.8 × 0.9 = 0.72','~discount 28%'],'discounts in a row multiply']]]],
  { b:[['Your turn. A device costs five hundred riyals with ten percent off. What is the price after the discount?',['^500 riyals, 10% off']]],
    o:['450','490','50','400'], a:0, ans:'500 × 0.9 = 450', tip:'10% off means you pay 90%',
    r:'Well done. Ten percent is fifty, and five hundred minus fifty is four hundred and fifty.',
    w:'Ten percent of five hundred is fifty; take it off the price: four hundred and fifty.' }),
  quiz:[
    {q:'Bought for 800, sold for 960. What is the profit percent?', o:['20%','16.7%','160%','30%'], a:0, e:'160 ÷ 800 = 20%.'},
    {q:'After 20% off an item costs 160. What was the original price?', o:['200','192','180','220'], a:0, e:'160 ÷ 0.8 = 200.'},
    {q:'50% off, then 20% off. What is the total discount?', o:['60%','70%','40%','30%'], a:0, e:'0.5 × 0.8 = 0.4, so the discount is 60%.'}]});

EADD({ key:'en-fd-a-speed', sk:'found', ord:11, title:'Speed, distance and time', ...EB([
  ['One relationship',[
    ['Every motion problem rests on one relationship: distance equals speed times time.',['^distance = speed × time']],
    ['Cover the unknown and the rule appears: speed is distance over time, and time is distance over speed.',['~speed = distance ÷ time','~time = distance ÷ speed']]]],
  ['Match the units',[
    ['A car covered one hundred and eighty kilometres in two and a quarter hours. Turn the minutes into hours first.',['^180 km in 2 h 15 min','~15 min = 0.25 h']],
    ['So the time is two and a quarter, and the speed is one hundred and eighty over two and a quarter: eighty kilometres an hour.',['!180 ÷ 2.25 = 80']]]],
  ['Average speed',[
    ['Someone drove out at sixty and back at forty on the same road. Is the average fifty?',['^60 out, 40 back']],
    ['No. Say the distance is one hundred and twenty: out takes two hours, back takes three, so two hundred and forty in five hours: forty-eight.',['~120 ÷ 60 = 2, 120 ÷ 40 = 3','!240 ÷ 5 = 48'],'average = total distance ÷ total time']]]],
  { b:[['Your turn. Two cars three hundred kilometres apart drive toward each other at seventy and eighty. After how many hours do they meet?',['^300 km, 70 and 80']]],
    o:['2','4','3','1.5'], a:0, ans:'300 ÷ 150 = 2', tip:'Toward each other: add the speeds',
    r:'Well done. They close in at one hundred and fifty, and three hundred over one hundred and fifty is two hours.',
    w:'When they drive toward each other, add the speeds: one hundred and fifty. Then three hundred over one hundred and fifty is two hours.' }),
  quiz:[
    {q:'A runner covered 12 km in an hour and a half. What was his speed?', o:['8 km/h','18 km/h','10 km/h','6 km/h'], a:0, e:'12 ÷ 1.5 = 8.'},
    {q:'How many minutes are in 0.4 of an hour?', o:['24','40','4','20'], a:0, e:'0.4 × 60 = 24.'},
    {q:'A truck goes 50 km/h; 30 km behind it a car goes 80 km/h the same way. When does the car catch up?', o:['after 1 hour','after 2 hours','after half an hour','after 3 hours'], a:0, e:'Chasing: subtract the speeds. 30 ÷ 30 = 1.'}]});

EADD({ key:'en-fd-a-work', sk:'found', ord:12, title:'Combined work and pipes', ...EB([
  ['The rate',[
    ['Someone who finishes a job in six days does a sixth of it each day. That is the rate.',['^6 days → 1/6 a day']],
    ['When two people work together, add their rates.',[],'together: add the rates']]],
  ['Working together',[
    ['Ahmed finishes the job in six hours, and Khalid in three. In one hour they do a sixth and a third.',['^1/6 + 1/3']],
    ['A sixth plus a third is a half, so together they finish in two hours.',['!1/6 + 2/6 = 1/2','!together: 2 hours']],
    ['Notice that together is faster than the faster one alone, so the answer can’t be nine hours.',[],'together beats the faster one']]],
  ['Filling and draining',[
    ['A tap fills a tank in four hours, and a drain empties it in twelve. The drain is subtracted.',['^1/4 − 1/12']],
    ['A quarter minus a twelfth is a sixth, so the tank fills in six hours.',['!3/12 − 1/12 = 1/6'],'the drain is subtracted']]]],
  { b:[['Your turn. One worker finishes in ten hours, another in fifteen. How long together?',['^10 and 15']]],
    o:['6','12.5','25','5'], a:0, ans:'150 ÷ 25 = 6', tip:'together = product ÷ sum',
    r:'Well done. The product is one hundred and fifty, over the sum, twenty-five, gives six hours.',
    w:'For two people: the product over the sum. One hundred and fifty over twenty-five is six hours.' }),
  quiz:[
    {q:'Ahmed finishes a job in 12 days and Saad in 6. How long together?', o:['4','9','18','3'], a:0, e:'72 ÷ 18 = 4.'},
    {q:'A tap fills a tank in 3 hours and a drain empties it in 6. When is it full?', o:['after 6 hours','after 2 hours','after 9 hours','after 3 hours'], a:0, e:'1/3 − 1/6 = 1/6.'},
    {q:'Someone finishes a job in 8 days. How much is done in 2 days?', o:['a quarter','a half','an eighth','a third'], a:0, e:'2 × 1/8 = 1/4.'}]});

EADD({ key:'en-fd-a-age', sk:'found', ord:13, title:'Ages and word problems', ...EB([
  ['From words to an equation',[
    ['A word problem is a sentence hiding an equation. Twice means times two, and more than means plus.',['~twice → × 2','~more than → +','~less than → −']],
    ['Let the smallest unknown be x, and write the others in terms of it.',[],'smallest unknown = x']]],
  ['The sum of two ages',[
    ['A father is four times as old as his son, and their ages add up to fifty. The son is x, the father is four x.',['^x + 4x = 50']],
    ['Five x is fifty, so the son is ten and the father is forty.',['!5x = 50, x = 10']]]],
  ['The gap stays fixed',[
    ['The gap between two ages never changes, and as years pass each person gains that many years.',[],'the age gap never changes'],
    ['The father is thirty-six now and the son is eight. In how many years will the father be three times as old? Call the years n.',['^36 + n = 3(8 + n)']],
    ['Thirty-six plus n equals twenty-four plus three n, so two n is twelve, and n is six.',['!2n = 12, n = 6']]]]],
  { b:[['Your turn. The ages of four brothers add up to forty now. What will they add up to in five years?',['^4 brothers, total 40']]],
    o:['60','45','50','20'], a:0, ans:'40 + 4 × 5 = 60', tip:'years × number of people',
    r:'Well done. Each brother gains five, there are four of them, so the total gains twenty.',
    w:'Each of the four gains five years, so the total gains twenty and becomes sixty.' }),
  quiz:[
    {q:'A mother is three times her daughter’s age, and together they are 48. How old is the daughter?', o:['12','16','36','24'], a:0, e:'4x = 48.'},
    {q:'A father is 25 years older than his son. What is the gap in 10 years?', o:['25','35','15','20'], a:0, e:'The age gap never changes.'},
    {q:'Two brothers differ by 4 years and their ages add up to 20. How old is the elder?', o:['12','8','10','16'], a:0, e:'(20 + 4) ÷ 2 = 12.'}]});

EADD({ key:'en-fd-a-count', sk:'found', ord:14, title:'Counting and probability', ...EB([
  ['The counting principle',[
    ['You have three shirts and four pairs of trousers. Each shirt has four trouser choices.',['^3 shirts × 4 trousers']],
    ['So the number of outfits is three times four: twelve. When choices come one after another, multiply.',['!3 × 4 = 12'],'steps in a row: multiply']]],
  ['Order or choice',[
    ['How many ways can four students sit on four chairs? The first has four choices, then three, then two, then one.',['^4 × 3 × 2 × 1 = 24']],
    ['For handshakes the order doesn’t matter. Six people shaking hands: six times five over two, so fifteen handshakes.',['!6 × 5 ÷ 2 = 15']]]],
  ['Probability',[
    ['Probability is the number of outcomes you want over the number of possible outcomes.',['^wanted ÷ possible']],
    ['A bag holds three red balls and five blue. The chance of drawing a red one is three eighths.',['!3/8'],'the bottom: all the balls']]]],
  { b:[['Your turn. A coin is tossed twice. What is the chance of heads both times?',['^heads, then heads']]],
    o:['1/4','1/2','2/3','1'], a:0, ans:'1/2 × 1/2 = 1/4', tip:'Independent events: multiply',
    r:'Well done. The tosses are independent: a half times a half is a quarter.',
    w:'For independent events, multiply the chances: a half times a half, which is a quarter.' }),
  quiz:[
    {q:'In a league of 5 teams, each team plays every other team once. How many matches?', o:['10','20','25','15'], a:0, e:'5 × 4 ÷ 2 = 10.'},
    {q:'How many ways can 3 different books be arranged on a shelf?', o:['6','3','9','27'], a:0, e:'3 × 2 × 1 = 6.'},
    {q:'What is the chance of an even number on one roll of a die?', o:['1/2','1/3','1/6','2/3'], a:0, e:'3 even numbers out of 6.'}]});

/* ===================== unit 3: algebra ===================== */
EADD({ key:'en-fd-l-expr', sk:'found', ord:15, title:'Algebraic expressions and substitution', ...EB([
  ['Like terms',[
    ['Like terms carry the same variable, so you add their numbers: three x plus five x is eight x.',['^3x + 5x = 8x']],
    ['But x and x squared, or x and a plain number, can’t be added together.',['~2x + 3 ≠ 5x']]]],
  ['Opening brackets',[
    ['A number in front of a bracket multiplies everything inside: three times x minus four is three x minus twelve.',['^3(x − 4) = 3x − 12']],
    ['A minus in front of a bracket flips every sign inside: five minus two times x minus three is eleven minus two x.',['~5 − 2(x − 3)','!= 5 − 2x + 6 = 11 − 2x'],'a minus before a bracket flips the signs']]],
  ['Substituting, and the whole expression',[
    ['To substitute, put the value in place of x: if x is three, then two x squared minus x is eighteen minus three, so fifteen.',['^x = 3','!2 × 3² − 3 = 15']],
    ['Sometimes you don’t need x at all: if x plus y is seven, then three x plus three y is twenty-one.',['~x + y = 7','!3x + 3y = 3 × 7 = 21']]]]],
  { b:[['Your turn. Simplify: four times x plus two, minus two times x minus three.',['^4(x + 2) − 2(x − 3)']]],
    o:['2x + 14','2x + 2','6x + 2','2x − 14'], a:0, ans:'4x + 8 − 2x + 6 = 2x + 14', tip:'The minus flips every sign',
    r:'Well done. Four x plus eight, minus two x plus six: two x plus fourteen.',
    w:'Watch the minus before the second bracket: minus two times minus three is plus six, so the answer is two x plus fourteen.' }),
  quiz:[
    {q:'Simplify: 5x + 2 − 2x + 4', o:['3x + 6','7x + 6','3x + 2','9x'], a:0, e:'5x − 2x = 3x and 2 + 4 = 6.'},
    {q:'If x = 4, what is x² − 3x?', o:['4','28','16','1'], a:0, e:'16 − 12 = 4.'},
    {q:'If a + b = 6, what is 5a + 5b?', o:['30','11','6','25'], a:0, e:'5 × 6 = 30.'}]});

EADD({ key:'en-fd-l-eq', sk:'found', ord:16, title:'Linear equations', ...EB([
  ['The balance',[
    ['An equation is a balanced scale: whatever you do to one side, do to the other, until x stands alone.',['^3x − 7 = 11']],
    ['Add seven to both sides: three x equals eighteen. Then divide by three: x is six.',['~3x = 18','!x = 6']]]],
  ['x on both sides',[
    ['Five x minus seven equals two x plus eight. Gather the x terms on one side and the numbers on the other.',['^5x − 7 = 2x + 8']],
    ['Five x minus two x is three x, and eight plus seven is fifteen, so x is five.',['~3x = 15','!x = 5'],'a term crosses over with the opposite sign']]],
  ['With fractions',[
    ['If fractions appear, multiply both sides by the common bottom to clear them.',['^x/3 + x/4 = 14']],
    ['Multiply by twelve: four x plus three x is one hundred and sixty-eight, so seven x is one hundred and sixty-eight, and x is twenty-four.',['~4x + 3x = 168','!x = 24']]]]],
  { b:[['Your turn. If nine x plus eight equals seventy-one, what is x?',['^9x + 8 = 71']]],
    o:['7','8','63','9'], a:0, ans:'9x = 63, x = 7', tip:'Subtract first, then divide',
    r:'Well done. Nine x is sixty-three, and x is seven.',
    w:'Take eight from both sides: nine x is sixty-three. Then divide by nine: seven.' }),
  quiz:[
    {q:'Solve: 4x + 5 = 2x + 17', o:['6','11','3','2'], a:0, e:'2x = 12, so x = 6.'},
    {q:'Solve: x/2 = 9', o:['18','4.5','11','7'], a:0, e:'Multiply both sides by 2.'},
    {q:'If 3x − 4 = 11, what is x + 2?', o:['7','5','9','3'], a:0, e:'x = 5, so x + 2 = 7.'}]});

EADD({ key:'en-fd-l-sys', sk:'found', ord:17, title:'Two equations in two unknowns', ...EB([
  ['Elimination',[
    ['You have two equations: x plus y is ten, and x minus y is four.',['^x + y = 10','^x − y = 4']],
    ['Add them and y disappears: two x is fourteen, so x is seven, and y is three.',['!2x = 14, x = 7','!y = 3']]]],
  ['Go straight for the sum',[
    ['Two x plus y is eleven, and x plus two y is thirteen. The question asks for x plus y.',['^2x + y = 11','^x + 2y = 13']],
    ['Add the equations: three x plus three y is twenty-four, so x plus y is eight, without solving for each one.',['!3x + 3y = 24','!x + y = 8'],'don’t solve what isn’t asked']]],
  ['Heads and legs',[
    ['A pen of chickens and sheep has twenty heads and fifty-six legs. If they were all chickens, there would be forty legs.',['^20 heads, 56 legs','~20 × 2 = 40']],
    ['That leaves sixteen extra legs, and each sheep adds two, so there are eight sheep and twelve chickens.',['!16 ÷ 2 = 8 sheep']]]]],
  { b:[['Your turn. Two numbers add up to seventeen and differ by seven. What is the larger one?',['^sum 17, difference 7']]],
    o:['12','5','10','7'], a:0, ans:'(17 + 7) ÷ 2 = 12', tip:'larger = (sum + difference) ÷ 2',
    r:'Well done. The sum plus the difference is twenty-four, and half of that is twelve.',
    w:'The larger number is the sum plus the difference, over two: twenty-four over two, which is twelve.' }),
  quiz:[
    {q:'If x + y = 9 and x − y = 3, what is x?', o:['6','3','4.5','12'], a:0, e:'2x = 12.'},
    {q:'If 3x + y = 13 and x + 3y = 11, what is x + y?', o:['6','24','12','8'], a:0, e:'Add them: 4x + 4y = 24.'},
    {q:'10 tickets were sold: adults 20, children 10, total 140. How many adult tickets?', o:['4','6','7','3'], a:0, e:'All children would give 100. The extra 40 ÷ 10 = 4.'}]});

EADD({ key:'en-fd-l-ineq', sk:'found', ord:18, title:'Inequalities', ...EB([
  ['Just like an equation',[
    ['An inequality is solved like an equation, but its answer is a set of values: x greater than three means every number past three.',['^2x + 1 > 7','~2x > 6','!x > 3']]]],
  ['Flip for a negative',[
    ['One rule is different: multiplying or dividing by a negative number flips the sign.',[],'divide by a negative: flip the sign'],
    ['Three minus two x is at least nine. Subtract three: negative two x is at least six.',['^3 − 2x ≥ 9']],
    ['Divide by negative two and the sign flips: x is at most negative three.',['!x ≤ −3']]]],
  ['Counting whole numbers',[
    ['How many whole numbers run from negative two up to, but not including, four?',['^−2 ≤ x < 4']],
    ['Negative two, negative one, zero, one, two and three: six numbers. Don’t forget zero.',['!six numbers'],'don’t forget zero']]]],
  { b:[['Your turn. What is the largest whole number with three x plus two less than seventeen?',['^3x + 2 < 17']]],
    o:['4','5','15','6'], a:0, ans:'x < 5, so the largest is 4', tip:'“less than” leaves out the end',
    r:'Well done. Three x is less than fifteen, so x is less than five, and the largest whole number is four.',
    w:'x is strictly less than five, so five itself doesn’t work, and the largest whole number is four.' }),
  quiz:[
    {q:'How many whole numbers satisfy 1 ≤ x ≤ 6?', o:['6','5','7','4'], a:0, e:'1, 2, 3, 4, 5, 6.'},
    {q:'Solve: 2x − 3 > 5', o:['x > 4','x > 1','x < 4','x > 8'], a:0, e:'2x > 8.'},
    {q:'If both sides of an inequality are multiplied by a negative number:', o:['the sign flips','it stays the same','it becomes an equation','the answer becomes zero'], a:0, e:'Multiplying or dividing by a negative flips the sign.'}]});

EADD({ key:'en-fd-l-ident', sk:'found', ord:19, title:'Identities and factoring', ...EB([
  ['The square of a sum',[
    ['x plus y, all squared, is not x squared plus y squared; there is a middle term.',['^(x + y)²']],
    ['The right answer: x squared, plus two x y, plus y squared.',['!= x² + 2xy + y²'],'don’t forget the middle term']]],
  ['Difference of two squares',[
    ['x squared minus y squared equals x minus y, times x plus y.',['^x² − y² = (x − y)(x + y)']],
    ['It is a real shortcut: fifty-one squared minus forty-nine squared is two times one hundred, so two hundred.',['!51² − 49² = 2 × 100 = 200']]]],
  ['Factoring',[
    ['To factor x squared minus five x plus six, find two numbers that add to negative five and multiply to six.',['^x² − 5x + 6']],
    ['They are negative two and negative three, so it factors as x minus two, times x minus three.',['!(x − 2)(x − 3)']]]]],
  { b:[['Your turn. If x plus y is seven and x times y is ten, what is x squared plus y squared?',['^x + y = 7, xy = 10']]],
    o:['29','49','69','39'], a:0, ans:'49 − 20 = 29', tip:'x² + y² = (x + y)² − 2xy',
    r:'Well done. Forty-nine minus twenty is twenty-nine.',
    w:'x squared plus y squared is the square of the sum minus two x y: forty-nine minus twenty, which is twenty-nine.' }),
  quiz:[
    {q:'What is 102² − 98²?', o:['800','4','400','16'], a:0, e:'(102 − 98)(102 + 98) = 4 × 200 = 800.'},
    {q:'x² − 9 factors as:', o:['(x − 3)(x + 3)','(x − 3)²','(x − 9)(x + 1)','it doesn’t factor'], a:0, e:'A difference of two squares.'},
    {q:'If x² − y² = 20 and x + y = 10, what is x − y?', o:['2','10','200','30'], a:0, e:'20 ÷ 10 = 2.'}]});

EADD({ key:'en-fd-l-seq', sk:'found', ord:20, title:'Sequences and patterns', ...EB([
  ['Arithmetic sequences',[
    ['An arithmetic sequence has a fixed difference: five, nine, thirteen. The difference is four.',['^5, 9, 13, …','~difference 4']],
    ['The twentieth term needs nineteen steps: five plus nineteen times four, which is eighty-one.',['!5 + 19 × 4 = 81'],'term n needs n − 1 steps']]],
  ['Geometric and others',[
    ['A geometric sequence has a fixed ratio: three, six, twelve. Each term doubles the one before.',['^3, 6, 12, 24']],
    ['If neither the difference nor the ratio is fixed, look at the differences of the differences: two, five, ten, seventeen. The gaps are three, five, seven, so next is twenty-six.',['^2, 5, 10, 17, ?','!17 + 9 = 26']]]],
  ['Repeating patterns',[
    ['If today is Sunday, what day is it in one hundred days? A week is a cycle of seven days.',['^in 100 days']],
    ['One hundred over seven: fourteen weeks with two left over, so move on two days: Tuesday.',['!100 = 14 × 7 + 2','!Tuesday'],'look at the remainder']]]],
  { b:[['Your turn. What comes next: one, two, four, eight, sixteen?',['^1, 2, 4, 8, 16, ?']]],
    o:['32','24','17','64'], a:0, ans:'16 × 2 = 32', tip:'Check the difference, then the ratio',
    r:'Well done. Each term doubles the one before, so next is thirty-two.',
    w:'The difference isn’t fixed, but the ratio is: each term doubles the one before, so next is thirty-two.' }),
  quiz:[
    {q:'What is the 10th term of 3, 7, 11, …?', o:['39','43','40','35'], a:0, e:'3 + 9 × 4 = 39.'},
    {q:'What is 1 + 2 + … + 10?', o:['55','50','100','45'], a:0, e:'10 × 11 ÷ 2 = 55.'},
    {q:'What comes next: 1, 4, 9, 16, …?', o:['25','20','24','36'], a:0, e:'Square numbers: 5² = 25.'}]});

/* ===================== unit 4: geometry ===================== */
EADD({ key:'en-fd-g-ang', sk:'found', ord:21, title:'Angles and lines', ...EB([
  ['A line and a point',[
    ['Two angles on a straight line add up to one hundred and eighty degrees, and the angles around a point add up to three hundred and sixty.',['^on a line: 180°','^around a point: 360°']],
    ['Complementary angles add to ninety, and supplementary angles add to one hundred and eighty.',['~complementary: 90°','~supplementary: 180°']]]],
  ['Vertical angles and parallel lines',[
    ['When two lines cross, the opposite angles are equal.',[],'vertical angles are equal'],
    ['When a line cuts two parallel lines, all the sharp angles are equal, and all the wide angles are equal.',['^acute = acute','^obtuse = obtuse']],
    ['An acute and an obtuse one add to one hundred and eighty: if the acute is sixty-five, the obtuse is one hundred and fifteen.',['!65° → 115°']]]],
  ['Clock angles',[
    ['There are thirty degrees between each pair of numbers on a clock, and the hour hand moves half a degree every minute.',['~30° between numbers','~hour hand: 0.5° a minute']],
    ['At half past three, the minute hand is at one hundred and eighty, the hour hand at one hundred and five, so the angle is seventy-five degrees.',['^3:30','!180 − 105 = 75°']]]]],
  { b:[['Your turn. Two angles are supplementary, and one is forty degrees more than the other. How big is the larger?',['^sum 180°, difference 40°']]],
    o:['110°','70°','140°','90°'], a:0, ans:'(180 + 40) ÷ 2 = 110°', tip:'larger = (sum + difference) ÷ 2',
    r:'Well done. The smaller is seventy, and the larger is one hundred and ten.',
    w:'One hundred and eighty minus forty is one hundred and forty; half is seventy for the smaller, so the larger is one hundred and ten.' }),
  quiz:[
    {q:'What is the complement of a 64° angle?', o:['26°','116°','36°','296°'], a:0, e:'90 − 64 = 26.'},
    {q:'Two vertical angles: one is 48°. What is the other?', o:['48°','132°','42°','96°'], a:0, e:'Vertical angles are equal.'},
    {q:'What is the angle between the clock hands at exactly nine o’clock?', o:['90°','270°','45°','180°'], a:0, e:'Three numbers × 30 = 90.'}]});

EADD({ key:'en-fd-g-tri', sk:'found', ord:22, title:'Triangles', ...EB([
  ['A triangle’s angles',[
    ['The angles of a triangle always add up to one hundred and eighty degrees.',['^a + b + c = 180°']],
    ['An exterior angle equals the sum of the two interior angles far from it.',[],'exterior = sum of the far two'],
    ['In an isosceles triangle the base angles are equal, and in an equilateral one each angle is sixty.',['~equilateral: each angle 60°']]]],
  ['Pythagoras',[
    ['In a right triangle, the square of the longest side equals the sum of the squares of the other two.',['^a² + b² = c²']],
    ['Learn the triples: three, four, five; five, twelve, thirteen; eight, fifteen, seventeen; and their multiples.',['!3, 4, 5','!5, 12, 13','!8, 15, 17']]]],
  ['Area',[
    ['A triangle’s area is half the base times the height, and the height is at right angles to the base.',['area = ½ × base × height']],
    ['Base ten and height six: the area is thirty.',['!½ × 10 × 6 = 30'],'the height is upright, not the slanted side']]]],
  { b:[['Your turn. A right triangle has a longest side of twenty-six and one short side of ten. What is the other side?',['^10, ?, 26']]],
    o:['24','16','28','36'], a:0, ans:'twice the triple 5, 12, 13', tip:'Look for a triple before you calculate',
    r:'Well done. This is double the triple five, twelve, thirteen, so the side is twenty-four.',
    w:'Ten and twenty-six are double five and thirteen, so the other side is double twelve: twenty-four.' }),
  quiz:[
    {q:'Two angles of a triangle are 50° and 60°. What is the third?', o:['70°','110°','90°','80°'], a:0, e:'180 − 110 = 70.'},
    {q:'A right triangle has short sides 6 and 8. How long is the longest side?', o:['10','14','12','7'], a:0, e:'Double the triple 3, 4, 5.'},
    {q:'Two sides of a triangle are 3 and 7. Which can be the third side?', o:['5','3','10','11'], a:0, e:'The third side is between 4 and 10, not equal to either.'}]});

EADD({ key:'en-fd-g-quad', sk:'found', ord:23, title:'Quadrilaterals and polygons', ...EB([
  ['The rectangle',[
    ['A rectangle’s area is length times width, and its perimeter is twice their sum.',['^area = length × width','^perimeter = 2 × (l + w)']],
    ['A rectangle with perimeter thirty and length nine: half the perimeter is fifteen, so the width is six and the area is fifty-four.',['!width = 15 − 9 = 6','!area = 9 × 6 = 54']]]],
  ['Other shapes',[
    ['A parallelogram: base times height. A rhombus: half the product of its diagonals.',['~parallelogram: base × height','~rhombus: ½ × diagonal × diagonal']],
    ['A trapezoid: half the sum of the parallel sides, times the height. Sides six and ten, height five: forty.',['!½ × (6 + 10) × 5 = 40']]]],
  ['Angles of a polygon',[
    ['The interior angles of a polygon add up to the number of sides minus two, times one hundred and eighty.',['^(n − 2) × 180°']],
    ['A pentagon: three times one hundred and eighty, so five hundred and forty, and each angle of a regular pentagon is one hundred and eight.',['!540 ÷ 5 = 108°'],'double the side = four times the area']]]],
  { b:[['Your turn. A square has a diagonal of ten. What is its area?',['^square, diagonal = 10']]],
    o:['50','100','25','20'], a:0, ans:'10² ÷ 2 = 50', tip:'square area = diagonal² ÷ 2',
    r:'Well done. A square’s area is the diagonal squared over two: one hundred over two, so fifty.',
    w:'From the diagonal: the area is the diagonal squared over two, so one hundred over two: fifty.' }),
  quiz:[
    {q:'A rhombus has diagonals 8 and 6. What is its area?', o:['24','48','14','28'], a:0, e:'½ × 8 × 6 = 24.'},
    {q:'What do the interior angles of a hexagon add up to?', o:['720°','1080°','540°','360°'], a:0, e:'4 × 180 = 720.'},
    {q:'A square’s side is doubled. Its area becomes:', o:['4 times as big','twice as big','3 times as big','8 times as big'], a:0, e:'2² = 4.'}]});

EADD({ key:'en-fd-g-circ', sk:'found', ord:24, title:'The circle', ...EB([
  ['Radius first',[
    ['Every circle formula starts from the radius. The circumference is two pi r, and the area is pi r squared.',['^circumference = 2πr','^area = πr²']],
    ['A circle with circumference ten pi has radius five, and area twenty-five pi.',['!r = 5, area = 25π']]]],
  ['The sector',[
    ['A sector is the share of the circle given by its angle over three hundred and sixty.',['sector = (angle ÷ 360) × area']],
    ['A ninety-degree sector of a circle with radius eight: a quarter of sixty-four pi, so sixteen pi.',['!1/4 × 64π = 16π']]]],
  ['The inscribed angle',[
    ['An inscribed angle is half the central angle on the same arc.',['^inscribed = ½ central']],
    ['And an inscribed angle that stands on a diameter is always a right angle.',[],'on a diameter: 90°']]]],
  { b:[['Your turn. If you double a circle’s radius, what happens to its area?',['^r → 2r']]],
    o:['times 4','it doubles','times 8','no change'], a:0, ans:'2² = 4', tip:'Area follows the radius squared',
    r:'Well done. The area follows the radius squared, and two squared is four.',
    w:'In the area formula the radius is squared, so doubling it multiplies the area by four.' }),
  quiz:[
    {q:'A circle has radius 3. What is its circumference?', o:['6π','9π','3π','12π'], a:0, e:'2π × 3 = 6π.'},
    {q:'A circle has area 36π. What is its diameter?', o:['12','6','36','18'], a:0, e:'The radius is 6, so the diameter is 12.'},
    {q:'A central angle is 120°. What is the inscribed angle on the same arc?', o:['60°','120°','240°','30°'], a:0, e:'The inscribed angle is half the central one.'}]});

EADD({ key:'en-fd-g-shade', sk:'found', ord:25, title:'Shaded areas', ...EB([
  ['The method',[
    ['A shaded area is usually found by subtracting: the big shape’s area minus the area that isn’t shaded.',['^shaded = big − unshaded']],
    ['The key is to see how the two shapes’ measurements are linked.',[],'find the shared length']]],
  ['A circle in a square',[
    ['A circle inside a square of side ten touches all four sides: its diameter equals the side, so its radius is five.',['^side = diameter = 10']],
    ['The square’s area is one hundred and the circle’s is twenty-five pi, so the shaded part is one hundred minus twenty-five pi.',['!100 − 25π']]]],
  ['A square in a circle',[
    ['A square with its corners on a circle of radius five: the square’s diagonal equals the circle’s diameter, which is ten.',['^square’s diagonal = 10']],
    ['A square’s area is the diagonal squared over two: fifty. So the shaded part is twenty-five pi minus fifty.',['!25π − 50'],'square’s diagonal = circle’s diameter']]]],
  { b:[['Your turn. Two circles share a centre, with radii seven and four. What is the area of the ring between them?',['^radii 7 and 4']]],
    o:['33π','9π','65π','3π'], a:0, ans:'49π − 16π = 33π', tip:'Subtract areas, not lengths',
    r:'Well done. Forty-nine pi minus sixteen pi: thirty-three pi.',
    w:'Subtract the two areas, not the radii: forty-nine pi minus sixteen pi, which is thirty-three pi.' }),
  quiz:[
    {q:'A 10 by 6 rectangle holds a triangle whose base is one side and whose top touches the opposite side. What is the triangle’s area?', o:['30','60','15','20'], a:0, e:'The triangle is half the rectangle.'},
    {q:'A square of side 6 holds a circle touching its sides. What is the circle’s area?', o:['9π','36π','6π','3π'], a:0, e:'The radius is 3.'},
    {q:'A square has its corners on a circle of diameter 8. What is the square’s area?', o:['32','64','16','48'], a:0, e:'8² ÷ 2 = 32.'}]});

EADD({ key:'en-fd-g-solid', sk:'found', ord:26, title:'Solids', ...EB([
  ['Volume',[
    ['Volume is almost one idea: the area of the base times the height.',['volume = base area × height']],
    ['A cube: the edge cubed. A box: length times width times height. A cylinder: pi r squared times the height.',['~cube: s³','~box: length × width × height','~cylinder: πr² × height']]]],
  ['One third',[
    ['A cone is a third of the cylinder with the same base and height, and a pyramid is a third of the prism.',[],'cone and pyramid: one third'],
    ['A cylinder of radius three and height ten: ninety pi. The matching cone is thirty pi.',['!π × 9 × 10 = 90π','!cone = 30π']]]],
  ['Scaling up',[
    ['If you double every length of a solid, its volume is multiplied by eight, because two cubed is eight.',['^lengths × 2 → volume × 8']],
    ['The surface area is only multiplied by four: length once, area squared, volume cubed.',['~length × 2, area × 4, volume × 8']]]]],
  { b:[['Your turn. A cube has a total surface area of one hundred and fifty. What is its volume?',['^surface area = 150']]],
    o:['125','25','150','625'], a:0, ans:'150 ÷ 6 = 25, s = 5, volume 125', tip:'A cube has six equal faces',
    r:'Well done. A cube has six faces, so a face is twenty-five, the edge is five, and the volume is one hundred and twenty-five.',
    w:'Divide by six faces: a face is twenty-five, so the edge is five, and the volume is five cubed: one hundred and twenty-five.' }),
  quiz:[
    {q:'How many cubes of edge 2 fill a box measuring 6 by 4 by 4?', o:['12','96','24','48'], a:0, e:'96 ÷ 8 = 12.'},
    {q:'A cylinder has radius 2 and height 5. What is its volume?', o:['20π','10π','40π','20'], a:0, e:'π × 4 × 5 = 20π.'},
    {q:'A cube’s edge is multiplied by 3. Its volume is multiplied by:', o:['27','9','3','6'], a:0, e:'3³ = 27.'}]});

/* ===================== unit 5: statistics and comparison ===================== */
EADD({ key:'en-fd-s-mean', sk:'found', ord:27, title:'The mean', ...EB([
  ['From mean to total',[
    ['The mean is the total over the count. On the test, the move that matters most is the reverse: total equals mean times count.',['^total = mean × count']],
    ['Five numbers have a mean of twelve, so their total is sixty.',['!5 × 12 = 60']]]],
  ['Removing a value',[
    ['One of those numbers is removed, and the mean of the other four becomes ten. Their total is forty.',['~4 × 10 = 40']],
    ['The removed number is the gap between the totals: sixty minus forty, so twenty.',['!60 − 40 = 20'],'compare totals, not means']]],
  ['The weighted mean',[
    ['A class of twenty has a mean of seventy, and a class of thirty has a mean of eighty. The overall mean isn’t seventy-five.',['^20 at 70, 30 at 80']],
    ['Add the totals: fourteen hundred and twenty-four hundred, so thirty-eight hundred, over fifty: seventy-six.',['!3800 ÷ 50 = 76']]]]],
  { b:[['Your turn. What is the mean of the whole numbers from eleven to nineteen?',['^11, 12, … , 19']]],
    o:['15','14','16','135'], a:0, ans:'(11 + 19) ÷ 2 = 15', tip:'Consecutive numbers: average the ends',
    r:'Well done. The numbers are consecutive, so the mean is the mean of the first and last: fifteen.',
    w:'For consecutive numbers, the mean is the mean of the first and last: eleven plus nineteen, over two, which is fifteen.' }),
  quiz:[
    {q:'3 numbers have a mean of 10, and two of them are 8 and 15. What is the third?', o:['7','10','12','5'], a:0, e:'The total is 30, and 30 − 23 = 7.'},
    {q:'A set has a mean of 20, and 5 is added to every value. The new mean is:', o:['25','20','100','4'], a:0, e:'The mean goes up by 5.'},
    {q:'4 numbers have a mean of 15, and 25 is added to them. The new mean is:', o:['17','20','16','18'], a:0, e:'(60 + 25) ÷ 5 = 17.'}]});

EADD({ key:'en-fd-s-med', sk:'found', ord:28, title:'Median, mode and range', ...EB([
  ['The median',[
    ['The median is the middle value once the list is in order. The most common mistake is looking for it before sorting.',['^7, 3, 9, 4, 12, 5']],
    ['In order: three, four, five, seven, nine, twelve. There are six values, so the median is the mean of five and seven: six.',['~3, 4, 5, 7, 9, 12','!(5 + 7) ÷ 2 = 6'],'sort first']]],
  ['Mode and range',[
    ['The mode is the value that appears most. In four, eight, four, six, four, the mode is four.',['^4, 8, 4, 6, 4','!mode = 4']],
    ['The range is the largest value minus the smallest: eight minus four, which is four.',['!range = 8 − 4 = 4']]]],
  ['The outlier',[
    ['For the ages twelve, fifteen, fifteen, eighteen and sixty, the median is fifteen.',['^12, 15, 15, 18, 60']],
    ['But the mean is twenty-four; the outlier dragged it up, while the median barely moved.',['~median 15, mean 24'],'an outlier drags the mean']]]],
  { b:[['Your turn. What is the median of twenty-nine, thirteen, fourteen, seventeen and seven?',['^29, 13, 14, 17, 7']]],
    o:['14','17','13','16'], a:0, ans:'7, 13, 14, 17, 29', tip:'The middle one after sorting',
    r:'Well done. In order: seven, thirteen, fourteen, seventeen, twenty-nine. The middle one is fourteen.',
    w:'Sort first: seven, thirteen, fourteen, seventeen, twenty-nine. The middle value is fourteen.' }),
  quiz:[
    {q:'What is the median of 2, 8, 4, 6?', o:['5','6','4','20'], a:0, e:'In order: 2, 4, 6, 8, so the median is (4 + 6) ÷ 2 = 5.'},
    {q:'What is the mode of 3, 5, 5, 7, 9, 5, 3?', o:['5','3','7','6'], a:0, e:'5 appears 3 times.'},
    {q:'What is the range of 4, 19, 7, 22, 10?', o:['18','15','22','6'], a:0, e:'22 − 4 = 18.'}]});

EADD({ key:'en-fd-s-chart', sk:'found', ord:29, title:'Reading tables and charts', ...EB([
  ['Read before you calculate',[
    ['Chart questions test careful reading before arithmetic: the title, the unit and the scale on the axis.',['~title, unit, axis scale']],
    ['Are the numbers in thousands? Are they percents? Half a minute here prevents a lot of mistakes.',[],'thousands or percents?']]],
  ['The pie chart',[
    ['In a pie chart, a share equals its percent times the total. A twenty-five percent slice of eight thousand is two thousand.',['^25% × 8000 = 2000']],
    ['And the slice’s angle is its percent times three hundred and sixty: twenty-five percent means ninety degrees.',['!25% × 360 = 90°']]]],
  ['Change in a table',[
    ['In a table of years, a number rose from four hundred to five hundred.',['^400 → 500']],
    ['Percent change is the difference over the earlier value: one hundred over four hundred, which is twenty-five percent.',['!100 ÷ 400 = 25%'],'divide by the earlier value']]]],
  { b:[['Your turn. A slice is fifteen percent of a pie chart. What is its central angle?',['^15% of 360°']]],
    o:['54°','15°','30°','72°'], a:0, ans:'0.15 × 360 = 54°', tip:'angle = percent × 360°',
    r:'Well done. Ten percent of three hundred and sixty is thirty-six, five percent is eighteen, and together that is fifty-four.',
    w:'Multiply the percent by three hundred and sixty: thirty-six plus eighteen, which is fifty-four degrees.' }),
  quiz:[
    {q:'A 40% slice of 5000 riyals is worth:', o:['2000','400','2500','1250'], a:0, e:'5000 × 0.4 = 2000.'},
    {q:'A number fell from 200 to 150. By what percent?', o:['25%','33%','50%','15%'], a:0, e:'50 ÷ 200 = 25%.'},
    {q:'A slice has a central angle of 90°. What percent of the whole is it?', o:['25%','90%','50%','10%'], a:0, e:'90 ÷ 360 = 1/4.'}]});

EADD({ key:'en-fd-s-cmp', sk:'found', ord:30, title:'Comparison questions', ...EB([
  ['The fixed choices',[
    ['A comparison question has four choices that never change: the first is greater, the second is greater, they are equal, or there isn’t enough information.',['~first greater, second greater','~equal, not enough information']],
    ['Learn them so you don’t reread them every time. All you need is which one is bigger, not an exact value.',[],'which is bigger? nothing more']]],
  ['Simplify both sides',[
    ['Seventeen times nineteen, against eighteen squared.',['^17 × 19 ? 18²']],
    ['Seventeen times nineteen is eighteen minus one, times eighteen plus one, which is eighteen squared minus one. So the second is greater.',['!18² − 1 < 18²']]]],
  ['Try values',[
    ['With variables, try different values: zero, one, a negative, a fraction and a big number.',['^x² ? x']],
    ['If x is two, the first is greater; if x is a half, the second is greater. The answer changed, so there isn’t enough information.',['~x = 2: first greater','~x = ½: second greater','!not enough information']]]]],
  { b:[['Your turn. If x is greater than one, compare x squared with x.',['^x > 1:  x² ? x']]],
    o:['first greater','second greater','equal','not enough information'], a:0, ans:'x = 2: 4 > 2', tip:'A condition can change the answer',
    r:'Well done. The square of any number greater than one is bigger than the number.',
    w:'The condition keeps x above one, and each such number is smaller than its square, so the first is always greater.' }),
  quiz:[
    {q:'First: 3/7 · Second: 0.43', o:['second greater','first greater','equal','not enough information'], a:0, e:'3 ÷ 7 ≈ 0.428.'},
    {q:'First: 25% of 80 · Second: 80% of 25', o:['equal','first greater','second greater','not enough information'], a:0, e:'Both are 20.'},
    {q:'If x + y = 10: first x · second y', o:['not enough information','first greater','second greater','equal'], a:0, e:'Either x or y could be larger.'}]});
})();
