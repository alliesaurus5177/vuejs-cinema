

<template>
	<div id="movie-list">
		<div v-if="filteredMovies.length">
			<movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie">	
				<div class="movie-sessions">
					<div 
						v-for="session in filteredSessions(movie.sessions)" 
						class="session-time-wrapper tooltip-wrapper"
						v-tooltip="{ seats: session.seats }"
						>
						<div class="session-time">{{ formatSessionTime(session.time) }}</div>
					</div>
				</div>	
			</movie-item>		
		</div>
		<div v-else-if="movies.length">
			{{ noResults }}
		</div>
		<div v-else>
			Loading...
		</div>
	</div>
</template>
<script>

import genres from '../util/genres'
import times from '../util/times';
import MovieItem from './MovieItem.vue'

	export default { 
			props: ['genre', 'time', 'movies', 'day'], 

			methods: {
				formatSessionTime(raw) {
					return this.$moment(raw).format('h:mm A');
				}, 
				filteredSessions(sessions){
					//look through sessions
					//which ones are today which ones aren't 
					return sessions.filter(this.sessionPassesTimeFilter);
				}, 
				moviePassesGenreFilter(movie) {
					if (!this.genre.length) {
						return true;
					}
					else {
						let movieGenres = movie.movie.Genre.split(", "); //splits genres at commas
						let matched = true; 
						this.genre.forEach(genre => {
							if (movieGenres.indexOf(genre) === -1) {
								matched = false; //found a non-present genre in movie 
							}
						});
						return matched;
					}
				}, 
				sessionPassesTimeFilter(session) {
					if (!this.day.isSame(this.$moment(session.time), 'day')) {
						return false; 
					} else if (this.time.length === 0 || this.time.length === 2) {
						return true; 
					} else if (this.time[0] === times.AFTER_6PM) {
						return this.$moment(session.time).hour() >= 18; //check hour of session, if greater then or equal to 10, give us those 
					} else {
						return this.$moment(session.time).hour() < 18;
					}
				},
			},
			computed: {
				filteredMovies() {
					return this.movies
						.filter(this.moviePassesGenreFilter)
						.filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
					;	
				}, 
				noResults() {
					let times = this.time.join(', '); //joins all things with comma and a space
					let genres = this.genre.join(', ');
					return `No Results for ${times}${times.length && genres.length ? ', ' : ''} ${genres}.`; 
				}	
			},
			components: {
				MovieItem, 
			}, 
			created() {
				console.log(this.$moment);
			}
		}
</script>