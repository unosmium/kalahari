import App from './App.svelte';
import wasm from 'sciolyff-web/Cargo.toml';

const init = async () => {
  const exports = await wasm();
  const app = new App({
    target: document.body,
    props: {
      editorContent:
"Tournament:\n  level: Nationals\n  location: Zoom University\n  division: C\n  year: 2020\n  date: 2020-04-01\n\nEvents:\n- name: Disease Detectives\n- name: Dynamic Planet\n\nTeams:\n- school: The Best Around\n  number: 1\n  state: AK\n- school: The Greatest Around\n  number: 2\n  state: HI\n\nPlacings:\n- event: Disease Detectives\n  team: 1\n  raw:\n    score: -1.0\n    tier: 2\n- event: Disease Detectives\n  team: 2\n  raw:\n    score: -10.0\n- event: Dynamic Planet\n  team: 1\n  raw:\n    score: 100.0\n- event: Dynamic Planet\n  team: 2\n  participated: false\n",
      generate_results: exports.generate_results
    }
  });
}

init();
