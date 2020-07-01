<script>
  export let editorContent;
  export let generate_results;

  let rawScores = false;
  let themeColor = "#303030";
  let url;

  let timeout;
  const debounceEditorContent = e => {
    clearTimeout(timeout);
    timeout = setTimeout(() => editorContent = e.target.value, 360);
  };

  $: {
    if (url) {
      URL.revokeObjectURL(url);
    }
    let results;
    try {
      results = generate_results(editorContent, rawScores, themeColor);
    } catch {
      results = "Invalid SciolyFF";
    }
    url = URL.createObjectURL(new Blob([results], {type : 'text/html'}));
  }
</script>

<main>
  <div id="editor">
    <div id="topbar">
      <h1>SciolyFF Editor</h1>
      <div id="options">
        <label>
          <input type="checkbox" bind:checked={rawScores}>
          Hide raw scores
        </label>
        <label>
          <input type="color" bind:value={themeColor}>
          Theme color
        </label>
      </div>
    </div>
    <textarea on:keyup={debounceEditorContent} value={editorContent}></textarea>
  </div>
  <iframe src={url} title="Results output preview"></iframe>
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
    max-width: 45em;
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
    margin: auto 3rem auto 1rem;
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
    font-family: monospace;
    font-size: 16px;
    background-color: #f5f5f5;
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
