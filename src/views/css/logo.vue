<template>
    <div class="contain">
        <div class="title">logo</div>
        <div class="item">
            <div class="shengshengbuxi">
                <div class="cycle cycle_1"></div>
                <div class="cycle cycle_2"></div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@widthNum: 100;
@width: 100px;
@widthNumHalf: (@widthNum / 2);
@widthCircle: (@widthNum / 5 * 3);
@widthCircleHalf: (@widthCircle / 2);
@widthCircleInset: (@widthNum / 5 * 2);
@widthCircleInsetHalf: (@widthCircleInset / 2);
@widthCircleAdd: (@widthNum + @widthCircleHalf + @widthCircleInset);
@width1: (@width / 5);
@width2: (@width1 * 2);
@border: (@width * 0.024);
@border1: (@width * 0.044);
@marginLeft: ((@width - @width2) / 2);
@pathLeft: 
    replace(
    replace(
    replace(
    replace(
    replace(
    'M0 @widthNumHalf v-@widthNumHalf h@widthNum v@widthNumHalf h-@widthCircleHalf a@widthCircleInsetHalf @widthCircleInsetHalf 0 1 0 -@widthCircleInset 0 a@widthCircleInsetHalf @widthCircleInsetHalf 0 0 0 @widthCircleInset 0 h@widthCircleHalf v@widthNumHalf h-@widthNum',
    '@widthCircleInsetHalf', @widthCircleInsetHalf, 'g'),
    '@widthCircleInset', @widthCircleInset, 'g'),
    '@widthCircleHalf', @widthCircleHalf, 'g'),
    '@widthNumHalf', @widthNumHalf, 'g'),
    '@widthNum', @widthNum, 'g'
    );
// @pathLeft: 'M0 250 v-250 h500 v250 h-150 a100 100 0 1 0 -200 0 a100 100 0 0 0 200 0 h150 v250 h-500';
@pathRight: 
    replace(
    replace(
    replace(
    replace(
    replace(
    replace(
    'M0 @widthNumHalf h@widthCircleHalf a@widthCircleInsetHalf @widthCircleInsetHalf 0 0 0 @widthCircleInset 0 a@widthCircleInsetHalf @widthCircleInsetHalf 0 0 0 -@widthCircleInset 0 a@widthNumHalf @widthNumHalf 0 0 0 -@widthNum 0 v-@widthNumHalf h@widthCircleAdd v@widthNum h-@widthNum',
    '@widthCircleInsetHalf', @widthCircleInsetHalf, 'g'),
    '@widthCircleInset', @widthCircleInset, 'g'),
    '@widthCircleHalf', @widthCircleHalf, 'g'),
    '@widthNumHalf', @widthNumHalf, 'g'),
    '@widthNum', @widthNum, 'g'),
    '@widthCircleAdd', @widthCircleAdd, 'g'
    );
// @pathRight: 'M0 250 h150 a100 100 0 0 0 200 0 a100 100 0 0 0 -200 0 a250 250 0 0 0 -500 0 v-250 h850 v500 h-500';
.contain {
    --black: #010101;
    --red: #F66034;
    --blue: #0A68DF;
    display: flex;
    align-items: center;
    padding: 0 20px;
}
.title {
    min-width: 60px;
}
.item {
    position: relative;
    margin-left: 10px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    overflow: hidden;
}
.shengshengbuxi {
    display: flex;
}
.cycle {
    position: relative;
    height: @width;
    width: @width;
    border-radius: 50%;
}
.cycle_1 {
    background: var(--red);
    background: repeating-linear-gradient(180deg, var(--red), var(--red) @border, var(--black) 0,  var(--black) @border1);
    border: @border solid var(--black);
    clip-path: path(@pathLeft);
}
.cycle_2 {
    margin-left: -@marginLeft;
    background: linear-gradient(to right, var(--red), var(--blue));
    border: @border solid var(--black);
    clip-path: path(@pathRight);
    z-index: 1;
}
.cycle_1::after, .cycle_2::after {
    content: '';
    display: inline-block;
    height: @width2;
    width: @width2;
    background: var(--black);
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: calc(-@width1 - @border);
    margin-left: calc(-@width1 - @border);
    border-radius: 50%;
    border: @border solid var(--black);
}
</style>