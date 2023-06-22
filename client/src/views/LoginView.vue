<template>
  <div class="login-form">
    <h2
      class="heading-secondary heading-secondary heading-gradient text-text-lg lg:text-2xl uppercase mb-8 font-semibold text-center"
    >
      Log into your account
    </h2>
    <form class="form form--login">
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
      <div class="form__group">
        <button
          class="btn py-3 px-6 bg-orange-500 text-sm lg:text-base hover:bg-orange-600 active:bg-orange-800"
          type="submit"
        >
          Log in
        </button>
      </div>
    </form>
  </div>
</template>

<style></style>
