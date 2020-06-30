<script>
	export let name;
</script>

<main>
  <textarea>Hello {name}!</textarea>
  <iframe></iframe>
</main>

<style>
	main {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    height: 100%;
	}

  textarea {
    width: 50%;
    margin: 0;
    border: none;
    resize: none;
  }

  iframe {
    border: none;
  }


	@media (max-width: 640px) {
    main {
      width: 200vw;
    }
	}
</style>
