const users = [{
        id: 1,
        name: 'Irene',
        schoolId: 101
    },
    {
        id: 2,
        name: 'Mike',
        schoolId: 999
    }
];

const grades = [{
        id: 1,
        schoolId: 101,
        grade: 86
    },
    {
        id: 2,
        schoolId: 999,
        grade: 99
    },
    {
        id: 3,
        schoolId: 101,
        grade: 67
    }
];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);
        if (user) {
            resolve(user);
        } else {
            reject('unable to find user', id);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    });
};

const getStatus = (userId) => {
    var user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        // qui non abbiamo accesso a user, devo creare variabile nella funzione
        let average = 0; // let==var
        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }
        return `${user.name} has a ${average}% in the class.`;
    });
};

getStatus(12).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e);
})

getGrades(10).then((grades) => {
    console.log(grades);
}).catch((e) => {
    console.log(e);
})

getUser(2).then((user) => {
    console.log(user);
}).catch((e) => {
    console.log(e);
})