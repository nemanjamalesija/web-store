<template>
  <div class="singup-form">
    <h2
      class="heading-secondary heading-gradient text-text-lg lg:text-2xl uppercase mb-5 font-semibold text-center"
    >
      Create your account
    </h2>
    <form class="form form--signup">
      <div class="form__group">
        <label class="form__label" for="name">Your name</label>
        <input id="name" class="form__input" type="text" placeholder="" required />
      </div>
      <div class="form__group">
        <label class="form__label" for="email">Email address</label>
        <input id="email" class="form__input" type="email" placeholder="you@example.com" required />
      </div>
      <div class="form__group ma-bt-md">
        <label class="form__label" for="password">Password</label>
        <input
          id="password"
          class="form__input"
          type="password"
          placeholder="••••••••"
          required
          minlength="8"
        />
      </div>
      <div class="form__group ma-bt-md">
        <label class="form__label" for="passwordConfirm">Confirm password</label>
        <input
          id="passwordConfirm"
          class="form__input"
          type="password"
          placeholder="••••••••"
          required
          minlength="8"
        />
      </div>
      <div class="form__group">
        <button
          class="btn py-3 px-6 bg-orange-500 text-sm lg:text-base hover:bg-orange-600 active:bg-orange-800"
          type="submit"
        >
          Sign up
        </button>
      </div>
    </form>
  </div>
</template>
