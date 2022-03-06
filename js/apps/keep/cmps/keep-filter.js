export default {
    template: `
    <section class="keep-filter">
    <section>
    <i class="fas fa-search"></i>
        <input v-model="filterBy.title" type="search" @input="filter"  placeholder="Search notes"> 
    </section>
<select v-model="filterBy.type " @change="filter">
<option value="All">All </option>  
<option value="noteTxt">Text</option>  
<option value="noteImg">Image</option>  
<option value="noteTodos">List</option>  
<option value="noteVideo">Video</option>  
</select>
    </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                type: 'All'
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy);
        },

    }
};