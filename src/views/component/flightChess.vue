<template>
    <div class="fight-chess">
        <div
            v-for="(item, index) in list"
            :style="{ gridArea: `span ${item.row || 1} / span ${item.col || 1}` }"
            :class="[(item.color && `bg-${item.color}`) || 'bg-none']"
            :key="index"
        >
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data () {
        return {
            list: Object.freeze([
                { row: 3, col: 3, color: 'yellow' },
                { row: 3, col: 3, color: 'yellow' },
                { row: 6, col: 1 },
                { row: 3, col: 3, color: 'green-bottom-right' },
                { row: 3, col: 2, color: 'red' },
                { row: 3, col: 2, color: 'yellow' },
                { row: 3, col: 2, color: 'blue' },
                { row: 3, col: 2, color: 'green' },
                { row: 3, col: 2, color: 'red' },
                { row: 3, col: 3, color: 'yellow-bottom-left' },
                { row: 6, col: 1 },
                { row: 3, col: 3, color: 'blue' },
                { row: 3, col: 3, color: 'blue' },

                { row: 3, col: 3, color: 'yellow' },
                { row: 3, col: 3, color: 'yellow' },
                { row: 2, col: 3, color: 'blue' },
                { row: 4, col: 4 },
                { row: 2, col: 2, color: 'blue' },
                { row: 4, col: 4 },
                { row: 2, col: 3, color: 'blue' },
                { row: 3, col: 3, color: 'blue' },
                { row: 3, col: 3, color: 'blue' },

                { row: 2, col: 3, color: 'yellow' },
                { row: 2, col: 2, color: 'blue' },
                { row: 2, col: 3, color: 'green' },

                { row: 1, col: 7 },
                { row: 1, col: 7 },

                { row: 3, col: 3, color: 'red-bottom-right' },
                { row: 3, col: 2, color: 'yellow' },
                { row: 3, col: 2, color: 'blue' },
                { row: 3, col: 3, color: 'green-red' },
                { row: 2, col: 4, color: 'red' },
                { row: 2, col: 2, color: 'blue' },
                { row: 2, col: 4, color: 'red' },
                { row: 3, col: 3, color: 'red-yellow' },
                { row: 3, col: 2, color: 'blue' },
                { row: 3, col: 2, color: 'green' },
                { row: 3, col: 3, color: 'red-bottom-left' },

                { row: 1, col: 4 },
                { row: 2, col: 2, color: 'blue' },
                { row: 1, col: 4},

                { row: 2, col: 3, color: 'green' },
                { row: 4, col: 4 },
                { row: 4, col: 2, color: 'green' },
                { row: 3, col: 5 },
                { row: 3, col: 5 },
                { row: 4, col: 2, color: 'yellow' },
                { row: 4, col: 4 },
                { row: 2, col: 3, color: 'yellow' },

                { row: 2, col: 2, color: 'blue' },

                { row: 2, col: 3, color: 'blue' },
                { row: 2, col: 3, color: 'blue' },
					
                { row: 1, col: 4 },
                { row: 4, col: 4, color: 'all' },
                { row: 1, col: 4 },

                { row: 2, col: 3, color: 'yellow' },
                { row: 2, col: 2, color: 'yellow' },
                { row: 2, col: 2, color: 'yellow' },
                { row: 2, col: 2, color: 'yellow' },
                { row: 2, col: 2, color: 'yellow' },
                { row: 2, col: 2, color: 'yellow' },
                { row: 2, col: 2, color: 'green' },
                { row: 2, col: 2, color: 'green' },
                { row: 2, col: 2, color: 'green' },
                { row: 2, col: 2, color: 'green' },
                { row: 2, col: 2, color: 'green' },
                { row: 2, col: 3, color: 'green' },

                { row: 2, col: 3, color: 'red' },
                { row: 4, col: 4 },
                { row: 4, col: 2, color: 'green' },
                { row: 1, col: 4 },
                { row: 1, col: 4 },
                { row: 4, col: 2, color: 'yellow' },
                { row: 4, col: 4 },
                { row: 2, col: 3, color: 'red' },

                { row: 3, col: 5 },
                { row: 2, col: 2, color: 'red' },
                { row: 3, col: 5 },

                { row: 2, col: 3, color: 'green' },
                { row: 2, col: 3, color: 'yellow' },

                { row: 2, col: 2, color: 'red' },
					
                { row: 3, col: 3, color: 'blue-top-right' },
                { row: 3, col: 2, color: 'yellow' },
                { row: 3, col: 2, color: 'red' },
                { row: 3, col: 3, color: 'green-blue' },
                { row: 1, col: 4 },
                { row: 1, col: 4 },
                { row: 3, col: 3, color: 'blue-yellow' },
                { row: 3, col: 2, color: 'red' },
                { row: 3, col: 2, color: 'green' },
                { row: 3, col: 3, color: 'blue-top-left' },

                { row: 2, col: 4, color: 'blue' },
                { row: 2, col: 2, color: 'red' },
                { row: 2, col: 4, color: 'blue' },
					
                { row: 1, col: 7 },
                { row: 2, col: 3, color: 'yellow' },
                { row: 4, col: 4 },
                { row: 2, col: 2, color: 'red' },
                { row: 4, col: 4 },
                { row: 2, col: 3, color: 'green' },
                { row: 1, col: 7 },

                { row: 3, col: 3, color: 'red' },
                { row: 3, col: 3, color: 'red' },
                { row: 6, col: 1 },
                { row: 6, col: 1 },
                { row: 3, col: 3, color: 'green' },
                { row: 3, col: 3, color: 'green' },

                { row: 2, col: 3, color: 'red' },
                { row: 2, col: 2, color: 'red' },
                { row: 2, col: 3, color: 'red' },

                { row: 3, col: 3, color: 'red' },
                { row: 3, col: 3, color: 'red' },
                { row: 3, col: 3, color: 'green-top-right' },
                { row: 3, col: 2, color: 'blue' },
                { row: 3, col: 2, color: 'yellow' },
                { row: 3, col: 2, color: 'red' },
                { row: 3, col: 2, color: 'green' },
                { row: 3, col: 2, color: 'blue' },
                { row: 3, col: 3, color: 'yellow-top-left' },
                { row: 3, col: 3, color: 'green' },
                { row: 3, col: 3, color: 'green' }
            ])
        }
    }
})
</script>

<style lang="less" scoped>
.fight-chess {
    display: grid;
    width: 100%;
    height: 100vw;
    grid-template-columns: repeat(30, 1fr);
    grid-template-rows: repeat(30, 1fr);
    grid-gap: 2px 2px;
}
.bg-none {
    // background-color: #d5d5d5;
}
@yellow: #ffc66e;
@blue: #70dfdf;
@red: #ff8da3;
@green: #80d870;

each({ yellow: @yellow; blue: @blue; red: @red; green: @green; }, .(@v1, @k1, @i1) {
    .bg-@{k1} {
        background-color: @v1;
    }
    each({ top: 135deg; bottom: 45deg }, .(@v2, @k2, @i2) {
        each({ left: ''; right: '-' }, .(@v3, @k3, @i3) {
            .bg-@{k1}-@{k2}-@{k3} {
                background-image: linear-gradient(if(@v3 = '-', -@v2, @v2), @v1 0%, @v1 50%, transparent 50%, transparent 100%);
            }
        })
    })
})
.bg-green-red {
    background-image: linear-gradient(45deg, @green 50%, @red 0, @red 100%);
}
.bg-red-yellow {
    background-image: linear-gradient(135deg, @red 50%, @yellow 0, @yellow 100%);
}
.bg-green-blue {
    background-image: linear-gradient(135deg, @green 50%, @blue 0, @blue 100%);
}
.bg-blue-yellow {
    background-image: linear-gradient(45deg, @blue 50%, @yellow 0, @yellow 100%);
}
.bg-all {
    background: conic-gradient(@blue 12.499%, @green 0 37.501%, @red 0 62.499%, @yellow 0 87.501%, @blue 0);
}
</style>
