export default {
  template: `
    <header class="app-header">
      <div class="logo">
      <router-link to="/" >
      <h1>App-Sus</h1>
    </router-link>
      </div>
      <nav>
            <router-link to="/" >Home</router-link> <span>|</span>
            <router-link to="/email" >Mail</router-link> <span>|</span>
            <router-link to="/keep" >Keep</router-link> 
        </nav>
    </header>
    `,
};