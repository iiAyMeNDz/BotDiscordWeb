// تهيئة الموقع
document.addEventListener('DOMContentLoaded', function() {
    // العناصر الأساسية
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const themeToggle = document.getElementById('themeToggle');
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    // تبديل القائمة الجانبية
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('sidebar-active');
    });
    
    // تبديل السمة
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // تحميل السمة المحفوظة
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    }
    
    // التنقل بين الصفحات
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // إزالة النشاط من جميع العناصر
            navItems.forEach(i => i.classList.remove('active'));
            // إضافة النشاط للعنصر المحدد
            this.classList.add('active');
            
            // إخفاء جميع الصفحات
            pages.forEach(page => page.classList.remove('active'));
            
            // إظهار الصفحة المحددة
            const pageId = this.getAttribute('data-page');
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                
                // إغلاق القائمة الجانبية على الهواتف
                if (window.innerWidth <= 992) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });
    
    // البحث
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Searching for:', searchTerm);
        // يمكنك إضافة منطق البحث هنا
    });
    
    // إشعارات
    const notificationBtn = document.querySelector('.notification-btn');
    notificationBtn.addEventListener('click', function() {
        alert('You have 3 unread notifications');
    });
    
    // ============ إدارة الملف الشخصي ============
    
    // تحديث معاينة اسم البوت
    const botNameInput = document.getElementById('botName');
    const botNamePreview = document.getElementById('botNamePreview');
    
    botNameInput.addEventListener('input', function() {
        botNamePreview.textContent = this.value || 'Venzo Bot';
    });
    
    // تغيير حالة البوت
    const botStatusSelect = document.getElementById('botStatus');
    const botStatusDisplay = document.querySelector('.bot-status');
    
    botStatusSelect.addEventListener('change', function() {
        const status = this.value;
        const statusText = this.options[this.selectedIndex].text;
        botStatusDisplay.innerHTML = `<i class="fas fa-circle"></i> ${statusText.split(' ')[1]}`;
        
        // تحديث لون المؤشر
        const indicator = document.querySelector('.online-indicator');
        indicator.style.backgroundColor = 
            status === 'online' ? '#57F287' :
            status === 'idle' ? '#FAA81A' :
            status === 'dnd' ? '#ED4245' :
            '#72767d';
    });
    
    // منتقي الألوان
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            const color = this.getAttribute('data-color');
            document.documentElement.style.setProperty('--primary-color', color);
            
            // حفظ اللون المختار
            localStorage.setItem('theme-color', color);
        });
    });
    
    // تحميل اللون المحفوظ
    const savedColor = localStorage.getItem('theme-color');
    if (savedColor) {
        document.documentElement.style.setProperty('--primary-color', savedColor);
        colorOptions.forEach(option => {
            if (option.getAttribute('data-color') === savedColor) {
                option.classList.add('active');
            }
        });
    }
    
    // ============ الرسوم البيانية ============
    
    // مخطط الرسائل اليومية
    const messagesCtx = document.getElementById('messagesChart').getContext('2d');
    const messagesChart = new Chart(messagesCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Messages',
                data: [1200, 1900, 1500, 2500, 2200, 3000, 2800],
                borderColor: '#8a2be2',
                backgroundColor: 'rgba(138, 43, 226, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#b9bbbe'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#b9bbbe'
                    }
                }
            }
        }
    });
    
    // مخطط المشاركة في الأحداث
    const eventsCtx = document.getElementById('eventsChart').getContext('2d');
    const eventsChart = new Chart(eventsCtx, {
        type: 'bar',
        data: {
            labels: ['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5'],
            datasets: [{
                label: 'Participants',
                data: [150, 230, 180, 300, 270],
                backgroundColor: '#8a2be2',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#b9bbbe'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#b9bbbe'
                    }
                }
            }
        }
    });
    
    // مخطط توزيع الأوامر
    const commandsCtx = document.getElementById('commandsChart').getContext('2d');
    const commandsChart = new Chart(commandsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Music', 'Moderation', 'Fun', 'Utility', 'Other'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#8a2be2',
                    '#5865F2',
                    '#57F287',
                    '#FAA81A',
                    '#ED4245'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#b9bbbe',
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
    
    // ============ نظام Embed Messages ============
    
    const newEmbedBtn = document.getElementById('newEmbedBtn');
    const createNewEmbedBtn = document.getElementById('createNewEmbed');
    const embedModal = document.getElementById('embedModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const confirmCreateBtn = document.getElementById('confirmCreate');
    const embedBuilder = document.getElementById('embedBuilder');
    const embedPreview = document.getElementById('embedPreview');
    const sendEmbedBtn = document.getElementById('sendEmbedBtn');
    const embedTypeBtns = document.querySelectorAll('.embed-type-btn');
    
    let currentEmbed = {
        title: '',
        description: '',
        url: '',
        color: '#8a2be2',
        thumbnail: '',
        image: '',
        author: '',
        footer: '',
        timestamp: false,
        fields: []
    };
    
    // فتح Modal إنشاء Embed جديد
    newEmbedBtn.addEventListener('click', openEmbedModal);
    createNewEmbedBtn.addEventListener('click', openEmbedModal);
    
    function openEmbedModal() {
        embedModal.classList.add('active');
    }
    
    // إغلاق Modal
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            embedModal.classList.remove('active');
        });
    });
    
    // إغلاق Modal بالنقر خارج المحتوى
    embedModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
    
    // اختيار نوع Embed
    let selectedEmbedType = 'basic';
    
    embedTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            embedTypeBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedEmbedType = this.getAttribute('data-type');
        });
    });
    
    // تأكيد إنشاء Embed
    confirmCreateBtn.addEventListener('click', function() {
        // تعيين قيم افتراضية حسب النوع
        switch(selectedEmbedType) {
            case 'welcome':
                currentEmbed = {
                    title: '👋 Welcome to the Server!',
                    description: 'We\'re glad to have you here! Please read the rules and enjoy your stay.',
                    color: '#57F287',
                    thumbnail: '',
                    image: '',
                    author: 'Venzo Bot',
                    footer: 'Welcome System',
                    timestamp: true,
                    fields: []
                };
                break;
            case 'announcement':
                currentEmbed = {
                    title: '📢 Important Announcement',
                    description: 'New update coming soon! Stay tuned for exciting new features.',
                    color: '#FAA81A',
                    thumbnail: '',
                    image: '',
                    author: 'Server Staff',
                    footer: 'Announcement',
                    timestamp: true,
                    fields: []
                };
                break;
            case 'rules':
                currentEmbed = {
                    title: '📜 Server Rules',
                    description: 'Please follow these rules to ensure a positive experience for everyone.',
                    color: '#ED4245',
                    thumbnail: '',
                    image: '',
                    author: 'Moderation Team',
                    footer: 'Last Updated',
                    timestamp: true,
                    fields: []
                };
                break;
            default: // basic
                currentEmbed = {
                    title: '',
                    description: '',
                    color: '#8a2be2',
                    thumbnail: '',
                    image: '',
                    author: '',
                    footer: '',
                    timestamp: false,
                    fields: []
                };
        }
        
        // تحديث حقول الإدخال
        updateEmbedForm();
        updateEmbedPreview();
        
        // إغلاق Modal والانتقال إلى صفحة Embeds
        embedModal.classList.remove('active');
        document.querySelector('.nav-item[data-page="embeds"]').click();
        
        // إظهار منشئ Embed
        embedBuilder.style.display = 'block';
    });
    
    // تحديث نموذج Embed
    function updateEmbedForm() {
        document.getElementById('embedTitle').value = currentEmbed.title;
        document.getElementById('embedDesc').value = currentEmbed.description;
        document.getElementById('embedUrl').value = currentEmbed.url;
        document.getElementById('embedColor').value = currentEmbed.color;
        document.getElementById('embedThumbnail').value = currentEmbed.thumbnail;
        document.getElementById('embedImage').value = currentEmbed.image;
        document.getElementById('embedAuthor').value = currentEmbed.author;
        document.getElementById('embedFooter').value = currentEmbed.footer;
        document.getElementById('embedTimestamp').checked = currentEmbed.timestamp;
        
        // تحديث حقول الإضافية
        updateFieldsContainer();
    }
    
    // تحديث معاينة Embed
    function updateEmbedPreview() {
        let html = `
            <div class="embed-preview-content" style="border-left: 4px solid ${currentEmbed.color}; padding: 0.5rem 1rem; background: rgba(0, 0, 0, 0.2); border-radius: 4px;">
        `;
        
        if (currentEmbed.author) {
            html += `<div style="font-weight: bold; margin-bottom: 0.5rem; font-size: 0.9rem;">${currentEmbed.author}</div>`;
        }
        
        if (currentEmbed.title) {
            const titleText = currentEmbed.url 
                ? `<a href="${currentEmbed.url}" style="color: #00aff4; text-decoration: none;">${currentEmbed.title}</a>`
                : currentEmbed.title;
            html += `<div style="font-weight: bold; margin-bottom: 0.5rem; font-size: 1rem;">${titleText}</div>`;
        }
        
        if (currentEmbed.description) {
            html += `<div style="margin-bottom: 0.5rem; color: #dcddde;">${currentEmbed.description}</div>`;
        }
        
        if (currentEmbed.fields && currentEmbed.fields.length > 0) {
            currentEmbed.fields.forEach(field => {
                html += `
                    <div style="margin-bottom: 0.5rem;">
                        <div style="font-weight: bold; font-size: 0.9rem;">${field.name}</div>
                        <div style="color: #dcddde; font-size: 0.9rem;">${field.value}</div>
                    </div>
                `;
            });
        }
        
        if (currentEmbed.footer) {
            html += `<div style="margin-top: 0.5rem; font-size: 0.8rem; color: #72767d;">${currentEmbed.footer}</div>`;
        }
        
        if (currentEmbed.timestamp) {
            const now = new Date();
            const timestamp = now.toLocaleDateString('ar-SA', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            html += `<div style="font-size: 0.8rem; color: #72767d;">${timestamp}</div>`;
        }
        
        html += `</div>`;
        
        embedPreview.innerHTML = html;
    }
    
    // تحديث حقول الإضافية
    function updateFieldsContainer() {
        const container = document.getElementById('fieldsContainer');
        container.innerHTML = '';
        
        currentEmbed.fields.forEach((field, index) => {
            const fieldElement = document.createElement('div');
            fieldElement.className = 'embed-field';
            fieldElement.innerHTML = `
                <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <input type="text" class="field-name" value="${field.name}" placeholder="Field name" data-index="${index}">
                    <input type="text" class="field-value" value="${field.value}" placeholder="Field value" data-index="${index}">
                    <button type="button" class="remove-field" data-index="${index}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            container.appendChild(fieldElement);
        });
        
        // إضافة مستمعات الأحداث للحقول
        document.querySelectorAll('.field-name, .field-value').forEach(input => {
            input.addEventListener('input', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const isName = this.classList.contains('field-name');
                
                if (isName) {
                    currentEmbed.fields[index].name = this.value;
                } else {
                    currentEmbed.fields[index].value = this.value;
                }
                
                updateEmbedPreview();
            });
        });
        
        document.querySelectorAll('.remove-field').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                currentEmbed.fields.splice(index, 1);
                updateFieldsContainer();
                updateEmbedPreview();
            });
        });
    }
    
    // إضافة حقل جديد
    const addFieldBtn = document.getElementById('addFieldBtn');
    addFieldBtn.addEventListener('click', function() {
        currentEmbed.fields.push({
            name: '',
            value: ''
        });
        updateFieldsContainer();
    });
    
    // مستمعات الأحداث لحقول الإدخال
    const embedInputs = [
        'embedTitle', 'embedDesc', 'embedUrl', 'embedColor',
        'embedThumbnail', 'embedImage', 'embedAuthor', 'embedFooter'
    ];
    
    embedInputs.forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('input', function() {
            const value = this.value;
            
            switch(id) {
                case 'embedTitle':
                    currentEmbed.title = value;
                    break;
                case 'embedDesc':
                    currentEmbed.description = value;
                    break;
                case 'embedUrl':
                    currentEmbed.url = value;
                    break;
                case 'embedColor':
                    currentEmbed.color = value;
                    break;
                case 'embedThumbnail':
                    currentEmbed.thumbnail = value;
                    break;
                case 'embedImage':
                    currentEmbed.image = value;
                    break;
                case 'embedAuthor':
                    currentEmbed.author = value;
                    break;
                case 'embedFooter':
                    currentEmbed.footer = value;
                    break;
            }
            
            updateEmbedPreview();
        });
    });
    
    // Timestamp toggle
    const embedTimestamp = document.getElementById('embedTimestamp');
    embedTimestamp.addEventListener('change', function() {
        currentEmbed.timestamp = this.checked;
        updateEmbedPreview();
    });
    
    // إرسال Embed
    sendEmbedBtn.addEventListener('click', function() {
        const channelSelect = document.getElementById('channelSelect');
        const selectedChannel = channelSelect.value;
        
        if (!selectedChannel) {
            alert('Please select a channel to send the embed to.');
            return;
        }
        
        // محاكاة إرسال الـ Embed
        const embedData = {
            ...currentEmbed,
            channel: selectedChannel,
            timestamp: new Date().toISOString()
        };
        
        console.log('Sending embed:', embedData);
        
        // عرض رسالة نجاح
        alert(`Embed sent successfully to #${selectedChannel}!`);
        
        // إعادة التعيين للنموذج
        currentEmbed = {
            title: '',
            description: '',
            url: '',
            color: '#8a2be2',
            thumbnail: '',
            image: '',
            author: '',
            footer: '',
            timestamp: false,
            fields: []
        };
        
        updateEmbedForm();
        updateEmbedPreview();
        channelSelect.value = '';
    });
    
    // تبديل التبويبات في محرر Embed
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // إزالة النشاط من جميع الأزرار والمحتوى
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // إضافة النشاط للعناصر المحددة
            this.classList.add('active');
            document.getElementById(tabId + 'Tab').classList.add('active');
        });
    });
    
    // ============ وظائف إضافية ============
    
    // تحميل الملفات (الصور)
    const fileInputs = [
        document.querySelector('.change-avatar-btn'),
        document.querySelector('.change-banner-btn')
    ];
    
    fileInputs.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = function(e) {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(event) {
                            if (btn.classList.contains('change-avatar-btn')) {
                                document.getElementById('botAvatarPreview').src = event.target.result;
                            } else {
                                document.getElementById('bannerPreview').style.backgroundImage = `url(${event.target.result})`;
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                };
                input.click();
            });
        }
    });
    
    // حفظ الإعدادات
    document.querySelectorAll('.settings-card input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const settingId = this.id || this.name;
            const value = this.checked;
            
            console.log(`Setting ${settingId} changed to: ${value}`);
            // يمكنك هنا إرسال الإعدادات إلى الخادم
        });
    });
    
    // اللغة
    const languageSelect = document.querySelector('.language-selector select');
    languageSelect.addEventListener('change', function() {
        const lang = this.value;
        console.log(`Language changed to: ${lang}`);
        // يمكنك هنا تغيير لغة الواجهة
    });
    
    // تحديث الإحصائيات في الوقت الفعلي (محاكاة)
    function updateStats() {
        const statCards = document.querySelectorAll('.stat-info h3');
        if (statCards.length >= 2) {
            // زيادة عشوائية في عدد الرسائل
            const messagesElement = statCards[0];
            const currentMessages = parseInt(messagesElement.textContent.replace(/,/g, ''));
            const newMessages = currentMessages + Math.floor(Math.random() * 10);
            messagesElement.textContent = newMessages.toLocaleString();
            
            // زيادة عشوائية في عدد الأعضاء
            const membersElement = statCards[1];
            const currentMembers = parseInt(membersElement.textContent.replace(/,/g, ''));
            const newMembers = currentMembers + Math.floor(Math.random() * 3);
            membersElement.textContent = newMembers.toLocaleString();
        }
    }
    
    // تحديث الإحصائيات كل 30 ثانية
    setInterval(updateStats, 30000);
    
    // ============ رسومات متحركة ============
    
    // تحريك العناصر عند الظهور
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // تطبيق الرسوم المتحركة على البطاقات
    document.querySelectorAll('.stat-card, .command-item, .action-btn').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    // تأثيرات Hover إضافية
    document.querySelectorAll('.nav-item, .command-card, .action-btn').forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-5px)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // تحميل البيانات الأولية
    console.log('Venzo Bot Dashboard loaded successfully!');
    
    // محاكاة اتصال WebSocket (للتحديثات في الوقت الفعلي)
    setTimeout(() => {
        console.log('WebSocket connected - Receiving real-time updates...');
    }, 1000);
});
