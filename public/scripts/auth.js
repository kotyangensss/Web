const host = 'http://localhost:3000';
supertokens.init({
  appInfo: {
    apiDomain: 'http://localhost:3000',
    apiBasePath: '/api/auth',
    appName: 'starege-xdd',
  },
  recipeList: [supertokensSession.init(), supertokensThirdParty.init()],
});

async function googleRegistration() {
  const response = await fetch(
    host + '/api/auth/authorisationurl?thirdPartyId=google',
    {
      method: 'GET',
      headers: {
        rid: 'thirdpartyemailpassword',
      },
    },
  ).then();

  let urlObj = new URL(JSON.parse(JSON.stringify(await response.json())).url);
  urlObj.searchParams.append('redirect_uri', host + '/auth/callback/google');
  let url = urlObj.toString();
  window.location.assign(url);
}

async function signup() {
  const name = document.getElementById('auth_name');
  const img = document.getElementById('auth_image');
  console.log(name.value);
  let code = new URL(window.location.href).searchParams.get('code');
  try {
    const response = await fetch(host + '/api/auth/signinup', {
      method: 'POST',
      headers: {
        rid: 'thirdpartyemailpassword',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        redirectURI: host + '/auth/callback/google',
        thirdPartyId: 'google',
      }),
    });
    const authRes = JSON.parse(JSON.stringify(await response.json()));
    console.log(authRes);

    const email = authRes.user.email;
    const id = authRes.user.id;
    const userFormData = new FormData();
    userFormData.append('name', name.value);
    userFormData.append('email', email);
    userFormData.append('type', 'artist');
    userFormData.append('profilePic', img.files[0]);

    const user = await fetch(host + '/user/create', {
      method: 'POST',
      body: userFormData,
    });

    const userId = JSON.parse(JSON.stringify(await user.json())).id;

    const auth = await fetch(
      host +
        '/auth/create?' +
        new URLSearchParams({
          id: userId,
          login: email,
          password: id,
        }),
      {
        method: 'POST',
      },
    ).then();

    window.location.assign('/user/' + userId);
  } catch (e) {
    console.log(e.message);
  }
}

async function googleSignIn() {
  try {
    const response = await fetch(
      host + '/api/auth/authorisationurl?thirdPartyId=google',
      {
        method: 'GET',
        headers: {
          rid: 'thirdpartyemailpassword',
        },
      },
    );

    let urlObj = new URL(JSON.parse(JSON.stringify(await response.json())).url);
    await urlObj.searchParams.append('redirect_uri', host + '/signin');

    await window.location.assign(urlObj.toString());
  } catch (err) {
    console.log(err.message);
  }
}

async function signin() {
  let code = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  const res = await fetch(host + '/api/auth/signinup', {
    method: 'POST',
    headers: {
      rid: 'thirdpartyemailpassword',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      redirectURI: '/',
      thirdPartyId: 'google',
    }),
  }).then();

  await window.location.assign('/');
}

async function signout() {
  await supertokensSession.signOut();
  window.location.assign('/');
}
