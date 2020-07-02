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

  let timeout2;
  const debounceThemeColor = e => {
    clearTimeout(timeout2);
    timeout2 = setTimeout(() => themeColor = e.target.value, 360);
  };

  $: {
    if (url) {
      URL.revokeObjectURL(url);
    }
    let results;
    try {
      results = generate_results(editorContent, rawScores, themeColor);
    } catch {
      results = "Failed to parse, probably invalid SciolyFF";
    }
    url = URL.createObjectURL(new Blob([results], {type : 'text/html'}));
  }

  import Switch from '@mbeineris/svelte-switch';
  import { afterUpdate } from 'svelte';

  let preview = false;
  let wrapper;

  afterUpdate(() => {
    if (preview) {
      wrapper.scrollLeft = 1000;
    } else {
      wrapper.scrollLeft = 0;
    }
  })
</script>

<div id="subway" bind:this={wrapper}>
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
          <input type="color" on:input={debounceThemeColor}>
          Theme color
        </label>
      </div>
    </div>
    <textarea on:keyup={debounceEditorContent} value={editorContent}></textarea>
  </div>
  <iframe src={url} title="Results output preview"></iframe>
</main>
<div id="toggle">
  <span class={preview ? '' : 'selected'}>Input</span>
  <Switch bind:checked={preview}></Switch>
  <span class={preview ? 'selected' : ''}>Output</span>
</div>
</div>

<style>
  div#subway {
    height: 100%;
  }

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

  div#toggle {
    display: none;
  }

  @media (max-width: 640px) {
    div#subway {
      width: 100vw;
      overflow: hidden;
    }

    main {
      width: 200vw;
      height: calc(100% - 4em);
    }

    div#toggle {
      background-color: #DDD;
      display: block;
      height: 4em;
      position: fixed;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    div#toggle > span {
      margin: 1em;
    }

    span.selected {
      text-decoration: underline;
      font-weight: bold;
    }
  }
</style>
