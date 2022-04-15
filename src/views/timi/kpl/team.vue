<script lang="ts" setup>
import { data as originData } from './kpl'
const getConcatData = (context: string) => {
    var contexts = context.split('|')
    for (var a:string[][] = []; a.push([]) < contexts.length;);
    var b = Math.pow(2, contexts.length) - 1;
    for (var i = 1; i <= b; i++) {
        var c = [];
        for (var s = i, k = 0; s > 0; s >>= 1, k++) {
            if ((s & 1) == 1) {
                c.push(contexts[k]);
            }
        }
        a[c.length - 1].push(c.join('|'));
    }
    return a
}
interface GameData {
    pick: number,
    win: number,
    lose: number,
    ban: number,
    key: string[]
}
interface ItemData {
    id: string,
    name: string,
    data: { [prop:string]: GameData }[],
    killAve: number,
    killAll: number,
    plays: number,
    win: number,
    rate: number
}
interface Data {
    [prop:string]: ItemData
}
interface Team {
    key: string,
    value: string
}
const data: Data = {}
const team: Team[] = []
originData.forEach(({ team_id: id, team_name: name, pick_heros, ban_heros, is_win, kill_cnt }) => {
    if (!data[id]) {
        data[id] = { id, name, data: [], killAve: 0, killAll: 0, plays: 0, win: 0, rate: 0 }
        team.push({ key: id, value: name })
    }
    if (pick_heros) {
        const theData = data[id]
        const isWin = is_win == '1'
        theData.plays++
        theData.killAll += +kill_cnt
        theData.killAve = theData.killAll / theData.plays
        theData.win += isWin ? 1 : 0
        theData.rate = theData.win / theData.plays
        const pickList = theData.data
        const pickData = getConcatData(pick_heros)
        console.log(pickData)
        const banData = ban_heros.split('|')
        for (let i = 0; i < 5; i++) {
            const items = pickList[i] = pickList[i] || {}
            pickData[i].forEach((key: string) => {
                key = key.split('|').sort((a, b) => Number(a) - Number(b)).join('|')
                const item = items[key] = items[key] || { pick: 0, win: 0, lose: 0, ban: 0, key }
                item.pick++
                isWin ? item.win++ : item.lose++
            })
            if (i === 0) {
                banData.forEach(key => {
                    if (key && key !== '0') {
                        items[key] = items[key] || { pick: 0, win: 0, lose: 0, ban: 0, key }
                        items[key].ban++
                    }
                })
            }
        }

    }
})
console.log(data)
console.log(team)
</script>
<template>
123
</template>