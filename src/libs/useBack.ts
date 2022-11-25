import { useRouter, useRoute, onBeforeRouteUpdate, LocationQuery } from 'vue-router'

export function useBeforeBack (beforeBackFun: () => boolean, query: LocationQuery): void {
    const router = useRouter()
    const route = useRoute()
    query = query || { back: 'before' }
    if (beforeBackFun) {
        router.push({ query })
        onBeforeRouteUpdate(() => {
            if (JSON.stringify(route.query) === JSON.stringify(query)) {
                if (beforeBackFun()) {
                    router.back()
                } else {
                    router.push({ query })
                }
            }
        })
    }
}