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

// return String
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

const getStatusAlt = async (userId) => {
    const user = await getUser(userId); // await for Promise se resolve -> user, altrimenti lancia un errore preso nel catch
    const grades = await getGrades(user.schoolId); //await solo se funzione async
    let average = 0; // let==var
    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average}% in the class.`;
};

getStatusAlt(2).then((name) => {
    console.log(name);
}).catch((e) => {
    console.log(e);
});

// esempio base equivalente
const getEsempioAsync = async (userId) => {
    throw new Error('errore');
    return 'Mike'; // return===resolve, throw new Error() === reject
};
const getEsempioStandard = (userId) => {
    return new Promise((resolve, seject) => {
        resolve('Mike');
    });
};
// console.log('Async: ', getEsempioAsync());
// console.log('Standard: ', getEsempioStandard());