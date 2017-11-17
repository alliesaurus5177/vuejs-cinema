<template>
	<div class="movie">
		<router-link v-bind:to="{name: 'movie', params: {id: movie.imdbID}}">
			<img v-bind:src="movie.Poster">
		</router-link>
		<div class="movie-col-right">
			<div class="movie-title">
				<router-link v-bind:to="{name: 'movie', params: {id: movie.imdbID}}">
					<h2>{{ movie.Title }}</h2>					
				</router-link>

				<span class="movie-rating">{{ movie.Rated }}</span>
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		props: ['movie'],
	}
</script>