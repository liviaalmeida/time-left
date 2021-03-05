<template>
  <div id="app">
		<header>
			<h1>
				Até que horas?
			</h1>
			<h3>
				cálculo de jornada
			</h3>
		</header>
    <Home />
		<footer>
			© Todos os direitos reservados.
			Desenvolvido por <a href="https://liviaalmeida.me" target="_blank">Lívia Almeida</a>
		</footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from './components/Home.vue';

@Component({
  components: {
    Home,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '~@/assets/scss/reset.scss';

html, body, #app {
	height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
	display: flex;
	flex-direction: column;

	* {
		box-sizing: border-box;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		flex-wrap: wrap;
		color: white;
		background-color: cornflowerblue;
		height: 90px;
		padding: 0 15px 20px;

		h1 {
			font-size: 30px;
		}
	}

	footer {
		font-size: 12px;
		height: 20px;

		a {
			text-decoration: none;
		}
	}
}
</style>
