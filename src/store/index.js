import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'
Vue.use(Vuex)

// realtime firebase
fb.usersCollection.orderBy('name').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    console.log("users",doc.data())

    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setUsers', postsArray)
});

// realtime firebase
fb.agentsCollection.orderBy('first_name').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setAgents', postsArray)
});

// realtime firebase
fb.customersCollection.orderBy('name').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    console.log("customers",doc.data())

    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setCustomers', postsArray)
});

// realtime firebase
fb.ordersCollection.orderBy('contacts').onSnapshot(snapshot => {
  let postsArray = []
 
  snapshot.forEach(doc => {

    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setOrders', postsArray)
});

// realtime firebase
fb.serviceTypesCollection.orderBy('name').onSnapshot(snapshot => {
  let postsArray = []
 
  snapshot.forEach(doc => {

    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })
  store.commit('setServiceTypes', postsArray)
});

// realtime firebase
fb.itemsCollection.orderBy('name').onSnapshot(snapshot => {
  let postsArray = []
 
  snapshot.forEach(doc => {

    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })
  store.commit('setAllItems', postsArray)
});

// realtime firebase
fb.servicesCollection.orderBy('name').onSnapshot(snapshot => {
  let postsArray = []
 
  snapshot.forEach(doc => {

    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })
  store.commit('setAllServices', postsArray)
});



const store = new Vuex.Store({
  state: {
    userProfile: {},
    items:[],
    itemsSaved:[],
    posts: [],
    users:null,
    agents:null,
    customers:null,
    services:null,
    serviceTypes:null,
    orders:null,
    allItems:null,
    allServices:null
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val
    },
    setPosts(state, val) {
      state.posts = val
    },
  
    setUsers (state, val) {
      state.users=val
    },

    setOrders (state, val) {
      state.orders=val
    },
    setAgents (state, val) {
      state.agents=val
    },
    setCustomers (state, val) {
      state.customers=val
    },
    setServices (state, val) {
      state.services=val
    },
    setServiceTypes (state, val) {
      state.serviceTypes=val
    },
    setItems (state, val) {
      state.itemsSaved=val
    }, 
    setAllItems (state, val) {
      state.allItems=val
    }, 
    setAllServices (state, val) {
      state.allServices=val
    }, 
    
    

  },
  actions: {
    async login({ dispatch }, form) {
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      dispatch('fetchUserProfile', user)
    },


 

  addItem: async ({commit},item) => {
    console.log("Item is it",item)
    item.createdAt=new Date();
     
    //todo  add this to firebase3
    try {
      fb.itemsCollection.add(item)
        

    } catch (error) {

      console.log("What is ",error)

    }
},

  
updateItem:  async ({commit},item) => { 
  // update user object
  console.log("Bluuu",item.id)

  try {
    fb.itemsCollection.doc(item.id).update({
      description: item.description,
      icon: item.icon,
      id: item.id,
      name: item.name,
      price: item.price,
      service_id: item.service_id,
      service_type_id: item.service_type_id
    })

  } catch (error) {
    console.log("home ",error)

  }
 

 
},
deleteItem:  async ({commit},id) => { 
// update user object
console.log("what is the shiets",id)

try {
  fb.itemsCollection.doc(id).delete()
  

} catch (error) {
  console.log("What is ",error)

}



},



getServices: async ({commit},service_type_id) => {
      console.log("what is this value" ,service_type_id)
      try {
        fb.servicesCollection.where('service_type_id', '==',service_type_id.val).onSnapshot(snapshot => {
          let postsArray = []
         
          snapshot.forEach(doc => {
               console.log("Anyth",doc)

            let post = doc.data()
            post.id = doc.id
        
            postsArray.push(post)
          })
          store.commit('setServices', postsArray)
        });
          

      } catch (error) {
        console.log("What is ",error)

      }
  },
  
  

  addService: async ({commit},item) => {
    console.log("Wasgwab",item)
    item.createdAt=new Date();
     
    //todo  add this to firebase3
    try {
      fb.servicesCollection.add(item)
    } catch (error) {
  
      console.log("What is ",error)
  
    }
  },
  
  
  
    updateService:  async ({commit},service) => { 
        // update user object
        console.log("what is the shiet",service)
  
        try {
          fb.servicesCollection.doc(service.id).update({
            name: service.name,
            description: service.description,
            icon: service.icon
          })
    
        } catch (error) {
          console.log("What is ",error)
  
        }
       
  
       
    },
    deleteService:  async ({commit},id) => { 
      // update user object
      console.log("what is the shiet",id)
  
      try {
        fb.servicesCollection.doc(id).delete()
        
  
      } catch (error) {
        console.log("What is ",error)
  
      }
     
  
     
  },

addServiceType: async ({commit},item) => {
  console.log("Item is it",item)
  item.createdAt=new Date();
   
  //todo  add this to firebase3
  try {
    fb.serviceTypesCollection.add(item)
  } catch (error) {

    console.log("What is ",error)

  }
},



  updateServiceType:  async ({commit},serviceType) => { 
      // update user object
      console.log("what is the shiet",serviceType)

      try {
        fb.serviceTypesCollection.doc(serviceType.id).update({
          name: serviceType.name,
          description: serviceType.description,
          icon: serviceType.icon
        })
  
      } catch (error) {
        console.log("What is ",error)

      }
     

     
  },
  deleteServiceType:  async ({commit},id) => { 
    // update user object
    console.log("what is the shiet",id)

    try {
      fb.serviceTypesCollection.doc(id).delete()
      

    } catch (error) {
      console.log("What is ",error)

    }
   

   
},


  getItems: async ({commit},service_id) => {
    try {
      console.log("what is the shiet",service_id)
      fb.itemsCollection.where('service_id', '==',service_id.val).onSnapshot(snapshot => {
        let postsArray = []
       
        snapshot.forEach(doc => {
             console.log("Anyth",doc)

          let post = doc.data()
          post.id = doc.id
      
          postsArray.push(post)
        })
        store.commit('setItems', postsArray)
      });
        

    } catch (error) {
      console.log("What is ",error)

    }
},


    async signup({ commit,dispatch }, form) {
      console.log("what the ",form)
      // sign user up
      try{
        const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)


        // create user object in userCollections
        await fb.usersCollection.doc(user.uid).set({
          name: form.name,
          title: form.title
        })


        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
      }catch(error){
        console.log("What is ",error)

      }

      
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async logout({ commit }) {
      // log user out
      await fb.auth.signOut()

      // clear user data from state
      commit('setUserProfile', {})

      // redirect to login view
      router.push('/login')
    },
    // async createPost({ state, commit }, post) {
    //   // create post in firebase
    //   await fb.postsCollection.add({
    //     createdOn: new Date(),
    //     content: post.content,
    //     userId: fb.auth.currentUser.uid,
    //     userName: state.userProfile.name,
    //     comments: 0,
    //     likes: 0
    //   })
    // },
    // async likePost ({ commit }, post) {
    //   const userId = fb.auth.currentUser.uid
    //   const docId = `${userId}_${post.id}`

    //   // check if user has liked post
    //   const doc = await fb.likesCollection.doc(docId).get()
    //   if (doc.exists) { return }

    //   // create post
    //   await fb.likesCollection.doc(docId).set({
    //     postId: post.id,
    //     userId: userId
    //   })

    //   // update post likes count
    //   fb.postsCollection.doc(post.id).update({
    //     likes: post.likesCount + 1
    //   })
    // },
    // async updateProfile({ dispatch }, user) {
    //   const userId = fb.auth.currentUser.uid
    //   // update user object
    //   const userRef = await fb.usersCollection.doc(userId).update({
    //     name: user.name,
    //     title: user.title
    //   })

    //   dispatch('fetchUserProfile', { uid: userId })

    //   // update all posts by user
    //   const postDocs = await fb.postsCollection.where('userId', '==', userId).get()
    //   postDocs.forEach(doc => {
    //     fb.postsCollection.doc(doc.id).update({
    //       userName: user.name
    //     })
    //   })

    //   // update all comments by user
    //   const commentDocs = await fb.commentsCollection.where('userId', '==', userId).get()
    //   commentDocs.forEach(doc => {
    //     fb.commentsCollection.doc(doc.id).update({
    //       userName: user.name
    //     })
    //   })
    // }
  }
})

export default store
