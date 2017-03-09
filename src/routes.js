// 1. Define route components.
// These can be imported from other files
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
import Home from "./components/Home.vue"
import Login from "./components/User/Login.vue"
import Register from "./components/User/Register.vue"



// User
import UserList from "./components/User/List.vue"

// Books
import BooksList from "./components/Books/List.vue"

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
export const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/', component: Home },
    { path: '/home', component: Home },

    // Users
    { path: '/users/list', component: UserList },
    { path: '/login', component: Login },
    { path: '/register', component: Register },

    // Books
    { path: '/books/list', component: BooksList },
]