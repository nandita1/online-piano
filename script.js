const synth = new Tone.Synth();
synth.oscillator.type = "sine";
synth.toMaster();
let stringPlayback= [];
const piano = document.getElementById("piano");

piano.addEventListener("mousedown", e => {
  synth.triggerAttack(e.target.dataset.note);
  stringPlayback.push(e.target.dataset.note);
  console.log(stringPlayback);
});

piano.addEventListener("mouseup", e => {
  synth.triggerRelease();
});

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "d":
    {
      stringPlayback.push("C4");
      return synth.triggerAttack("C4");
    }
    case "r":
    {
      stringPlayback.push("C#4");
      return synth.triggerAttack("C#4");
    }
    case "f":
    {
      stringPlayback.push("D4");
      return synth.triggerAttack("D4");
    }
    case "t":
    {
      stringPlayback.push("D#4");
      return synth.triggerAttack("D#4");
    }
    case "g":
    {
      stringPlayback.push("E4");
      return synth.triggerAttack("E4");
    }
    case "h":
    {
      stringPlayback.push("F4");
      return synth.triggerAttack("F4");
    }
    case "u":
    {
      stringPlayback.push("F#4");
      return synth.triggerAttack("F#4");
    }
    case "j":
    {
      stringPlayback.push("G4");
      return synth.triggerAttack("G4");
    }
    case "i":
    {
      stringPlayback.push("G#4");
      return synth.triggerAttack("G#4");
    }
    case "k":
    {
      stringPlayback.push("A4");
      return synth.triggerAttack("A4");
    }
    case "o":
    {
      stringPlayback.push("A#4");
      return synth.triggerAttack("A#4");
    }
    case "l":
    {
      stringPlayback.push("B4");
      return synth.triggerAttack("B4");
    }
    default:
      return;
  }
});

document.addEventListener("keyup", e => {
  switch (e.key) {
    case "d":
    case "r":
    case "f":
    case "t":
    case "g":
    case "h":
    case "u":
    case "j":
    case "i":
    case "k":
    case "o":
    case "l":
       synth.triggerRelease();
  }
  console.log(stringPlayback);
});


let audio = document.querySelector('audio');
  let synthy = new Tone.Synth();
  let actx  = Tone.context;
  let dest  = actx.createMediaStreamDestination();
  let recorder = new MediaRecorder(dest.stream);
  let reset = false;
  synthy.connect(dest);
  synthy.toMaster();

  let chunks = [];

  // const notes = 'C C D C# D# F#'.split(' ').map(n => `${n}4`);
  let notes = stringPlayback;
  let note = 0;
  document.getElementById('resetThis').addEventListener('click', () => {
	  stringPlayback = [];
	  document.getElementById('clickThis').disabled = false;
	  note = 0;
	  notes = stringPlayback;
	  recorder.start();
	  reset=true;
  });

document.getElementById('clickThis').addEventListener('click', () => {
  if(stringPlayback.length>0)
  {
  document.getElementById("clickThis").disabled = true;
  
  Tone.Transport.scheduleRepeat(time => {
	//console.log(note);
    if (note === 0 && reset==false) {console.log(recorder.state);recorder.start();}
    if (note > notes.length) {
      synth.triggerRelease(time)
      recorder.stop();
      Tone.Transport.stop();
	  
	  //note=0;
	  //actx.suspend();
	  //e.target.disabled = true;
    } else synth.triggerAttack(notes[note], time);
    note++;
  }, '8n');

  recorder.ondataavailable = evt => chunks.push(evt.data);
  recorder.onstop = evt => {
    let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
    audio.src = URL.createObjectURL(blob);
	
  };
  
  

  Tone.Transport.start();
  }
});
/*
document.getElementById('stop').addEventListener('click', () => {
		document.getElementById('clickThis').disabled = true;
		document.getElementById('stop').disabled = false;
		//console.log(stringPlayback);
		const synth = new Tone.MembraneSynth();
	
		const actx  = Tone.context;
		const dest  = actx.createMediaStreamDestination();
		const recorder = new MediaRecorder(dest.stream);

		synth.connect(dest);
		synth.toMaster();
		//const notes = ["C3", "Eb3", "G3", "Bb3"];
		const synthPart = new Tone.Sequence(
		function(time, note) {
		  synth.triggerAttackRelease(note, "10hz", time);
		},
		stringPlayback,
		"8n"
		);
		synthPart.start();
	
		//recorder.ondataavailable = evt => chunks.push(evt.data);
	  //recorder.onstop = evt => {
		//let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
		//audio.src = URL.createObjectURL(blob);
		//};
		Tone.Transport.start();
	});

document.getElementById('clickThis').addEventListener('click', () => {
	document.getElementById('stop').disabled = false;
	//stringPlayback=[];
	
	
	
});*/