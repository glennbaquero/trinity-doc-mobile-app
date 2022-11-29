<template>
    <div class="table__calendarHolder">
        <p class="text-center font-weight-bold">{{ yearAndMonth }}</p>
        <table class="weekly__calendarHolder">
          <tr>
            <th><v-icon>{{ 'fa-chevron-left' }}</v-icon></th>
            <th>Su</th> 
            <th>M</th>
            <th>Tu</th>
            <th>W</th>
            <th>Th</th>
            <th>F</th>
            <th>Sa</th>
            <th><v-icon>{{ 'fa-chevron-right' }}</v-icon></th> 
          </tr>
          <tr>
            <td></td>
            <template v-for="n  in endOfWeek">
                <template v-if="n >= startOfWeek">
                    <td :class="{'today': today == n}">{{ n }}</td>
                </template>
            </template>
          </tr>
          
        </table>
      </div>
</template>

<script>
export default {
    
    computed: {
        yearAndMonth() {
            return moment().format('MMMM YYYY');
        },
        today() {
            return moment().format('D');            
        },
        startOfWeek() {
            return parseInt(moment().startOf('week').format('D'));
        },
        endOfWeek() {
            return  parseInt(moment().endOf('week').format('D'));
        }
    },
}
</script>