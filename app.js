(function () {
    'use strict';

    var DEMO_IDS = ['demo-signup', 'demo-interests', 'demo-feed', 'demo-project', 'demo-extras'];
    var VISIBLE_CLASS = 'demo-visible';
    var HIDDEN_CLASS = 'demo-hidden';

    var PROBLEMS = [
        'Reduce campus energy waste using IoT sensors',
        'Develop a tool to track software evolution in student projects',
        'Design a sustainable product for student housing',
        'Create a campus-wide data visualization dashboard'
    ];

    function showDemoCard(id) {
        DEMO_IDS.forEach(function (demoId) {
            var el = document.getElementById(demoId);
            if (el) {
                el.classList.remove(VISIBLE_CLASS);
                el.classList.add(HIDDEN_CLASS);
            }
        });
        var target = document.getElementById(id);
        if (target) {
            target.classList.remove(HIDDEN_CLASS);
            target.classList.add(VISIBLE_CLASS);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function goToInterests() {
        showDemoCard('demo-interests');
    }

    function goToFeed() {
        showDemoCard('demo-feed');
        var list = document.getElementById('problemList');
        if (list) {
            list.innerHTML = '';
            PROBLEMS.forEach(function (p) {
                var li = document.createElement('li');
                li.textContent = p;
                list.appendChild(li);
            });
        }
    }

    function joinProject() {
        showDemoCard('demo-project');
    }

    function unlockLevel(level) {
        var node = document.getElementById('level' + level);
        if (node) {
            node.classList.remove('locked');
            node.querySelectorAll('input, button').forEach(function (el) {
                el.disabled = false;
            });
            var connector = node.previousElementSibling;
            if (connector && connector.classList.contains('roadmap-connector')) {
                connector.classList.remove('locked');
            }
        }
    }

    function finishProject() {
        showDemoCard('demo-extras');
    }

    function resetDemo() {
        showDemoCard('demo-signup');
        document.querySelectorAll('.roadmap-node').forEach(function (node) {
            if (node.id === 'level2' || node.id === 'level3') {
                node.classList.add('locked');
                node.querySelectorAll('input, button').forEach(function (el) {
                    el.disabled = true;
                });
            }
        });
        document.querySelectorAll('.roadmap-connector').forEach(function (conn) {
            conn.classList.add('locked');
        });
    }

    window.goToInterests = goToInterests;
    window.goToFeed = goToFeed;
    window.joinProject = joinProject;
    window.unlockLevel = unlockLevel;
    window.finishProject = finishProject;
    window.resetDemo = resetDemo;

    // Side nav (mobile menu)
    var menuToggle = document.querySelector('.menu-toggle');
    var sideNav = document.querySelector('.side-nav');
    var sideNavBackdrop = document.querySelector('.side-nav-backdrop');
    var sideNavClose = document.querySelector('.side-nav-close');

    function openNav() {
        if (sideNav) sideNav.classList.add('is-open');
        if (sideNavBackdrop) sideNavBackdrop.classList.add('is-visible');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        if (sideNav) sideNav.classList.remove('is-open');
        if (sideNavBackdrop) sideNavBackdrop.classList.remove('is-visible');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (menuToggle) menuToggle.addEventListener('click', openNav);
    if (sideNavClose) sideNavClose.addEventListener('click', closeNav);
    if (sideNavBackdrop) sideNavBackdrop.addEventListener('click', closeNav);

    document.querySelectorAll('.side-nav-list a').forEach(function (link) {
        link.addEventListener('click', closeNav);
    });
})();
