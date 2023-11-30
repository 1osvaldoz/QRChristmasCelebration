const currentUserStep = (userStep) =>
    ({
        0: '/customizeQuestions',
        1: '/steps',
        2: '/steps',
        3: '/steps',
        4: '/dashboard',
        5: '/dashboard',
    }[userStep] || '/steps');

export default currentUserStep;
