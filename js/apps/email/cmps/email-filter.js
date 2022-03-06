export default {
    name: 'email-filter',
    template: `
        <section class="email-filter">
        <span class=" fas fa-search" ></span>
            <input 
            type="text" 
            @input="setFilter" 
            placeholder="Search all Emails" 
            v-model="filterBy.byName">
            <select v-model="filterBy.kind" @change="setFilter">
                <option value = "All" >All</option>
                <option value ="Unread" >Unread</option>
                <option value ="Read" >Read</option>
            </select>
        </section>    
    `,
    data() {
        return {
            filterBy: {
                byName: '',
                kind: 'All'
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('filtered', this.filterBy)
        }
    }
}