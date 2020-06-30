<script>
	export let name;
</script>

<main>
  <div id="editor">
    <div id="topbar">
      <h1>SciolyFF Editor</h1>
      <div id="options">
        <label>
          <input type="checkbox">
          Hide raw scores
        </label>
        <label>
          <input type="color" value="#303030">
          Theme color
        </label>
      </div>
    </div>
    <textarea>Hello {name}!</textarea>
  </div>
  <iframe title="Results output preview"></iframe>
</main>

<style>
	main {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    height: 100%;
	}

  div#editor {
    width: 50%;
    display: flex;
    flex-direction: column;
  }

  div#topbar {
    background-color: lightgreen;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  h1 {
    margin: auto 16rem auto 1rem;
    padding: 0.15em 0;
    white-space: nowrap;
  }

  div#options {
    background-color: lightblue;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
  }

  div#options > label {
    flex-grow: 1;
    display: inline;
    margin: 1em;
    white-space: nowrap;
    cursor: pointer;
  }

  input {
    margin: 0;
    margin-bottom: 0.15em;
    height: 1em;
    padding: 0;
    border: 0;
    vertical-align: bottom;
    display: inline;
  }

  input[type="color"] {
    width: 2em;
  }

  textarea {
    flex-grow: 1;
    width: 100%;
    margin: 0;
    border: none;
    resize: none;
    padding: 1em;
  }

  iframe {
    border: none;
    flex-grow: 1;
  }

  @media (max-width: 640px) {
    main {
      width: 200vw;
    }
  }
</style>
