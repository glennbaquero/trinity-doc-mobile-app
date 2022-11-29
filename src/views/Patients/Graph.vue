<template>
    <div>
        <line-chart 
        :data="data"
        :discrete="true">
        </line-chart>
    </div>
</template>

<script>

export default {
    props: {
        data: {
            type: Array,
            default: []
        }
    }  
}

</script>