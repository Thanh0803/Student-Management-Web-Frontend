import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';
import Secure from '@/views/Pages/Secure.vue';
import NotFound from '@/views/NotFoundPage.vue';

const auth = (to, from, next) => {
  if (localStorage.getItem("token")) {
    if(localStorage.getItem("role") == 0) return next("/admin")
    else if(localStorage.getItem("role") == 1) return next("/teacher")
    else if(localStorage.getItem("role") == 2) return next("/student")
  } else {
    return next("/login");
  }
};
const guest = (to, from, next) => {
  if (localStorage.getItem("token")) {
    if(localStorage.getItem("role") == 0) return next("/admin")
    else if(localStorage.getItem("role") == 1) return next("/teacher")
    else if(localStorage.getItem("role") == 2) return next("/student")
  } else {
    return next();
  }
};
const authAdmin = (to, from, next) => {
  if (localStorage.getItem("token") && localStorage.getItem("role") == 0) {
    return next();
  } else {
    return next("/");
  }
};
const authTeacher = (to, from, next) => {
  if (localStorage.getItem("token") && localStorage.getItem("role") == 1) {
    return next();
  } else {
    return next("/");
  }
};
const authStudent = (to, from, next) => {
  if (localStorage.getItem("token") && localStorage.getItem("role") == 2) {
      return next();
  } else {
    return next("/");
  }
};


const routes = [
  {
    path: '/',
    beforeEnter: auth,
  },
  // {
  //   path: "/admin/",
  //   component: DashboardLayout,
  //   redirect: "/admin/dashboard/",
  //   // meta: {
  //   //   requiresAuth: true
  //   // },
  //   beforeEnter: authAdmin,
  //   children: [
  //     {
  //       path: "dashboard",
  //       name: "Admin",
  //       component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Student/Secure.vue')
  //     }
  //     // {
  //     //   path: "dashboard",
  //     //   name: "Dashboard",
  //     //   component: Dashboard
  //     // }
  
  //   ]
  // },
  {
    path: '/admin/',
    redirect: '/admin/dashboard/',
    component: DashboardLayout,
    beforeEnter: authAdmin,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: 'icons',
        name: 'icons',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
      },
      {
        path: 'maps',
        name: 'maps',
        component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue')
      },
      {
        path: 'teacher',
        name: 'teacher',
        component: () => import(/* webpackChunkName: "demo" */ '../views/admins/TeacherManagement.vue')
      },
      {
        path: 'student',
        name: 'student',
        component: () => import(/* webpackChunkName: "demo" */ '../views/admins/StudentManagement.vue')
      },
      {
        path: 'grade/:id',
        name: 'grade',
        component: () => import(/* webpackChunkName: "demo" */ '../views/admins/GradeManagement.vue')
      },
      {
        path: 'subject/:id',
        name: 'subject',
        component: () => import(/* webpackChunkName: "demo" */ '../views/admins/TeacherManagement.vue')
      },
      {
        path: 'tables',
        name: 'tables',
        component: () => import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue')
      },
      {
        path: 'student/upload/:id',
        name: 'UploadStudent',
        component: () => import(/* webpackChunkName: "demo" */ '../views/admins/UploadExcelStudent.vue')
      },
      {
        path: 'assign/teacher',
        name: 'assign',
        component: () => import(/* webpackChunkName: "demo" */ '../views/admins/TeacherAssignment.vue')
      },
      {
        path: 'grade/class/:id',
        name: 'class',
    component: () => import(/* webpackChunkName: "demo" */ '../views/admins/StudentManagement.vue')
      },
      {
        path: 'teacher/upload/:id',
        name: 'Teacher',
    component: () => import(/* webpackChunkName: "demo" */ '../views/admins/UploadExcelTeacher.vue')
      },
      {
        path: 'class/upload/:id',
        name: 'Class',
    component: () => import(/* webpackChunkName: "demo" */ '../views/admins/GradeManagement.vue')
      },
    ]
  },

  {
    path: '/login',
    // redirect: 'login',
    component: AuthLayout,
    beforeEnter: guest,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
      },
      // {
      //   path: '/register',
      //   name: 'register',
      //   component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      // },
      
    ]
  },
  
  {
    path: '/secure',
    name: 'secure',
    component: Secure,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/teacher/",
    component: DashboardLayout,
    redirect: "/teacher/home/",
    // meta: {
    //   requiresAuth: true
    // },
    beforeEnter: authTeacher,
    children: [
      {
        path: "home",
        name: "SecureTeacher",
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Teacher/Secure.vue')
      },
      {
        path: "class/subject/:id",
        name: "Mark Information",
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Teacher/MarkManagement.vue')
      },
      {
        path: "class/:id",
        name: "Mark Information",
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Teacher/ConductManagement.vue')
      }
  
    ]
  },
  {
    path: "/student/",
    component: DashboardLayout,
    redirect: "/student/home/",
 
    beforeEnter: authStudent,
    children: [
      {
        path: "home",
        name: "SecureStudent",
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Student/Secure.vue')
      },
      {
        path: "class/:id",
        // name: "Mark Detail",
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Student/MarkDetail.vue')
      },
      {
        path: "conduct",
        // name: "Mark Detail",
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Student/ConductDetail.vue')
      }
  
    ]
  },
  { path: '*', component: NotFound }
];

export default routes;
