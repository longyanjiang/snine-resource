<template>
    <div class="app-layout-wrap">
        <app-header />
        <div class="app-content">
            <slot></slot>
        </div>
        <app-footer />
    </div>
</template>

<script>
import AppHeader from '@/components/Main/AppHeader/AppHeader'
import AppFooter from '@/components/Main/AppFooter/AppFooter'
export default {
    components: {
        AppHeader,
        AppFooter
    },
}
</script>
