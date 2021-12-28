
let hello = async () => {
  return await Promise.resolve('Hello');
}
hello().then(value => console.log("value" ,value))


async function myFetch() {
  let response = await fetch('coffee.jpg');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.blob();
}

myFetch()
  .then((blob) => {
    let objectURL = URL.createObjectURL(blob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
  })
  .catch((e) => console.log(e));

  //The await keyword causes the JavaScript runtime to pause your code on this line,
  //  not allowing further code to execute in the meantime until the async 
  // function call has returned its result — 
  // very useful if subsequent code relies on that result!
  //Once that's complete, your code continues to execute starting on the next line

  //when we call the myFetch() function, it returns a promise, so we can chain 
  // a .then() onto the end of it inside which we handle displaying the blob
  // onscreen.
  //We can also append a .catch() to catch any Error object returned from the function
  //Such .catch() block with catch error coming both from the function and the 
  // addidional appended .then() blocks


  //Awaiting a Promise.all()
  // async/await is built on top of promises, so it's compatible with all the
  // features offered by promises. 
  // This includes Promise.all() — you can quite happily await a Promise.all()
  // call to get all the results returned into a variable in a way that looks
  // like simple synchronous code

  //Example:
  async function fetchAndDecode(url, type) {
    let response = await fetch(url);

    let content;

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      if (type === 'blob') {
        content = await response.blob();
      } else if (type === 'text') {
        content = await response.text();
      }
    }

    return content;
  }

  async function displayContent() {
    let coffee = fetchAndDecode('coffee.jpg', 'blob');
    let tea = fetchAndDecode('tea.jpg', 'blob');
    let description = fetchAndDecode('description.txt', 'text');

    let values = await Promise.all([coffee, tea, description]);

    let objectURL1 = URL.createObjectURL(values[0]);
    let objectURL2 = URL.createObjectURL(values[1]);
    let descText = values[2];

    let image1 = document.createElement('img');
    let image2 = document.createElement('img');
    image1.src = objectURL1;
    image2.src = objectURL2;
    document.body.appendChild(image1);
    document.body.appendChild(image2);

    let para = document.createElement('p');
    para.textContent = descText;
    document.body.appendChild(para);
  }

  displayContent().catch((e) => console.log(e));

  //By using await here we are able to get all the results of the three promises
  // returned into the values array, when they are all available, in a way
  //  that looks very much like sync code. We've had to wrap all the code in
  // a new async function, displayContent()

  //Creating a function that returns a Promise object:
  function timeoutPromise(interval) {
  return new Promise( (resolve, reject) => {
    setTimeout(function(){
      resolve("done");
    }, interval);
  });
};

timeoutPromise().then()...
or 
await timeoutPromise()

//Effective coding:
//In the slow-async-await.html example, timeTest() looks like this:
async function timeTest() {
  await timeoutPromise(3000);
  await timeoutPromise(3000);
  await timeoutPromise(3000);
}

// In the fast-async-await.html example, timeTest() looks like this:

async function timeTest() {
  const timeoutPromise1 = timeoutPromise(3000);
  const timeoutPromise2 = timeoutPromise(3000);
  const timeoutPromise3 = timeoutPromise(3000);

  await timeoutPromise1;
  await timeoutPromise2;
  await timeoutPromise3;
}
//Here we store the three Promise objects in variables, which has the effect 
// of setting off their associated processes all running simultaneously.

