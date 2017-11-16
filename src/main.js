import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment} });//makes moment accesible by child components

new Vue({
	el: '#app',
	data: {
		genre: [],
		time: [],
		movies: [],
		moment
	},
	methods: {
		checkFilter(category, title, checked) {
			if (checked) {
				this[category].push(title);
			}
			else {
				let index = this[category].indexOf(title);//returns -1 if not present 
				if (index > -1) {
					this[category].splice(index, 1);
				}
			}
		}
	},
	components:{
		MovieList, 
		MovieFilter
	}, 
	created() {
		this.$http.get('/api').then(response => {
			this.movies = response.data;
		}); //to do API call 
	}
});
