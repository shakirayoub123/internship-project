// import {mount} from '@vue/test-utils'
// import {createStore} from "vuex";
// import homePage from "@/components/HomePage.vue"
//
// test('global', async () => {
//     const store = createStore()
//     const wrapper = mount(homePage, {
//         global: {
//             plugins: [store]
//         }
//     })
//     it('ItemsTodo be mounted', () => {
//
//         expect(wrapper.exists()).toBeTruthy()
//
//     })
//
// })


import {shallowMount} from "@vue/test-utils"
import moxios from 'moxios'

import HomePage from "@/components/HomePage.vue";
import Footer from "@/dashboard/Footer.vue";
import ControlSidebar from "@/dashboard/ControlSidebar.vue";
import Sidebar from "@/dashboard/Sidebar.vue";
import App from "vue";
const {

    createRouterMock,

    injectRouterMock

}= require('vue-router-mock')
describe("HomePage.Vue", () => {

    const router = createRouterMock({

    })

    beforeEach(()=>{

        injectRouterMock(router)

    })

    let wrapper;

    const mockRouter={

        push: jest.fn()

    }
    const updateWrapper = ()=>{

        wrapper = shallowMount(HomePage,{

            data(){
                return{
                    loading:true,
                }
            },
            computed:{

                users: jest.fn(),

                displayedPosts: jest.fn(),

            },
            created: jest.fn(),

            redirectTo:jest.fn(),

            global:{

                mocks:{

                    $router: mockRouter,
                    stubs:['paginate'],

                }
            },
            router
        })

    }
    test("rendering AdminLte themes",()=>{

        const wrapper = shallowMount(App)

        expect(wrapper.findComponent(Sidebar).exists()).toBe(true)

        expect(wrapper.findComponent(Footer).exists()).toBe(true)

        expect(wrapper.findComponent(ControlSidebar).exists()).toBe(true)

    })

    beforeEach(function () {

        updateWrapper();

        moxios.install();

    })

    afterEach(function () {

        moxios.uninstall()

    })

    it('ItemsTodo be mounted', () => {

        expect(wrapper.exists()).toBeTruthy()

    })
    test('route on buttons',async()=>{

        // wrapper.vm.redirectTo

        await wrapper.find(".button1").trigger("click")

        expect(mockRouter.push).toHaveBeenCalledTimes(1)

        expect(mockRouter.push).toHaveBeenCalledWith('/')

    })

})