document.addEventListener('DOMContentLoaded', () => {
   
    // 1. SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.1, rootMargin: "0px 0px -20px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. FAQ ACCORDION LOGIC
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 3. BULLETPROOF MODAL LOGIC
    const serviceData = {
        mobiles: {
            title: "Mobile Repair",
            desc: "Expert, micro-level repair for flagship smartphones. Fast turnaround.",
            process: "1. Diagnostic Scan\n2. Quote Generation\n3. Precision OEM Repair\n4. QA Testing",
            benefits: "Genuine OEM Parts\nUp to 180-Day Warranty\nData Privacy Guaranteed"
        },
        laptops: {
            title: "Laptop & MacBook",
            desc: "Hardware reconstruction and software tuning for professional workstations.",
            process: "1. Component Diagnosis\n2. Cost Approval\n3. Hardware Swap\n4. Stress-Test Benchmarking",
            benefits: "No Fix, No Fee\nUp to 180-Day Warranty\nCertified Techs"
        },
        ac: {
            title: "AC Servicing",
            desc: "High-end servicing to restore factory cooling efficiency. Deep cleaning & gas refilling.",
            process: "1. Pressure Load Testing\n2. PCB Inspection\n3. Eco Gas Top-up\n4. Temperature Validation",
            benefits: "Zero-Mess Protocol\nEnergy Efficiency Boost\nUp to 180-Day Warranty"
        },
        washing: {
            title: "Washing Machine",
            desc: "Addressing MCU/inverter board failures, bearing noise, and drainage blocks.",
            process: "1. Error Code Extraction\n2. Mechanical Isolation\n3. Part Replacement\n4. Full Wash Cycle Test",
            benefits: "Rapid Doorstep Service\nFactory-Grade Parts\nUp to 180-Day Warranty"
        },
        fridge: {
            title: "Refrigerator Service",
            desc: "Resolving complex cooling cycles and inverter compressor faults.",
            process: "1. Thermistor Checks\n2. System Inspection\n3. Gas Charging\n4. Monitoring",
            benefits: "OEM Compressors\nExtended Lifespan\nUp to 180-Day Warranty"
        },
        cutlery: {
            title: "Cutlery Sharpening",
            desc: "Professional sharpening and edge restoration. 🌟 SPECIAL OFFER: Sharpen up to 2 knives for FREE within the flat ₹300 pickup and drop charge!",
            process: "1. Edge Assessment\n2. Professional Grinding & Honing\n3. Detail Polishing\n4. Sharpness Validation",
            benefits: "Up to 2 Knives FREE (within ₹300 fee)\nFactory-Grade Edges\nSafe Transport & Handling"
        },
        geyser: {
            title: "Geyser Service",
            desc: "Resolving thermostat failures, leakage, and burnt heating elements safely.",
            process: "1. Power & Leak Check\n2. Element Diagnostics\n3. Parts Replacement\n4. Heat Validation",
            benefits: "100% Shock-Proof Protocol\nRapid Heating Restored\nUp to 180-Day Warranty"
        },
        ro: {
            title: "RO Water Purifier",
            desc: "Restoring pure, safe drinking water through advanced filter and pump changes.",
            process: "1. TDS Level Testing\n2. Membrane Check\n3. Filter/Pump Swap\n4. Flow Rate Validation",
            benefits: "Medical-Grade Filters\nDoorstep Service\nUp to 180-Day Warranty"
        },
        tv: {
            title: "Television Repair",
            desc: "Fixing motherboard issues, backlight failures, and audio faults for LED/OLED displays.",
            process: "1. Panel/Board Scan\n2. Quote Approval\n3. Precision Micro-Soldering\n4. Display Calibration",
            benefits: "Original Display Components\nCareful Handling\nUp to 180-Day Warranty"
        },
        watch: {
            title: "Watch Restoration",
            desc: "Delicate hardware repair for premium wearables and analog timepieces, focusing on battery health, movement, and screen integrity.",
            process: "1. Diagnostic Inspection\n2. Part/Cell Procurement\n3. Precision Swap/Polishing\n4. Sync & Time Test",
            benefits: "Specialized Horology Tools\nUp to 180-Day Warranty\nSafe Handover"
        },
        bike: {
            title: "Two-Wheeler Servicing",
            desc: "Convenient doorstep mechanical repair, oil changes, and tune-ups for your daily commute.",
            process: "1. Multi-Point Inspection\n2. Fluids & Filter Check\n3. Core Issue Repair\n4. Test Ride Validation",
            benefits: "Genuine Spare Parts\nTransparent Costing\nSaves You Garage Time"
        },
        microwave: {
            title: "Microwave Repair",
            desc: "Fixing magnetrons, control panels, and sparking issues securely.",
            process: "1. Radiation Leak Check\n2. High-Voltage Test\n3. Part Replacement\n4. Heating Cycle Run",
            benefits: "Factory-Trained Techs\nSafe Handling\nUp to 180-Day Warranty"
        },
        electrician: {
            title: "Master Electrician",
            desc: "Premium electrical troubleshooting for load balancing and short circuits.",
            process: "1. Hazard Identification\n2. Circuit Tracing\n3. Rewiring\n4. Final Safety Audit",
            benefits: "Background-Checked Pros\nTransparent Pricing\n100% Fire-Safe Code"
        }
    };

    const modal = document.getElementById("serviceModal");
    const closeBtn = document.querySelector(".close-modal");
    const modalGoBookBtn = document.getElementById("modalGoBookBtn");

    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.view-details');
        if (btn) {
            const serviceKey = btn.getAttribute('data-service');
            const data = serviceData[serviceKey];
            if(data) {
                document.getElementById('modalTitle').innerText = data.title;
                document.getElementById('modalDesc').innerText = data.desc;
                document.getElementById('modalProcess').innerText = data.process;
                document.getElementById('modalBenefits').innerText = data.benefits;
                modal.classList.add('show');
            }
        }
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    modalGoBookBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        window.location.href = "#book";
    });
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
    });

    // 4. SMART BOOKING FORM DYNAMICS
    const formOptions = {
        Mobile: { brands: ["Apple (iPhone)", "Samsung", "OnePlus", "Google Pixel", "Xiaomi", "Vivo/Oppo", "Other"], problems: ["Screen Damage", "Battery Degradation", "Water Damage", "Charging Port", "Motherboard Dead", "Camera Issue", "Other"] },
        Laptop: { brands: ["Apple (MacBook)", "Dell", "HP", "Lenovo", "Asus", "Acer", "Other"], problems: ["Display Replacement", "Battery Replacement", "Keyboard/Trackpad", "Dead/Not Powering", "OS Crash", "Overheating", "Other"] },
        Watch: { brands: ["Casio/Fossil/Titan", "Rolex/Omega/Luxury", "Apple/Samsung/Smart", "Garmin/Fitbit", "Other"], problems: ["Analog Battery/Cell Change", "Analog Movement/Dial Issue", "Smartwatch Screen Broken", "Smartwatch Battery Draining", "Water Damage", "Other"] },
        Bike: { brands: ["Royal Enfield", "Honda", "Bajaj", "Yamaha", "TVS", "Suzuki", "Hero", "KTM", "Other"], problems: ["General Service", "Engine Oil Change", "Brake Issue", "Tyre Puncture/Replace", "Battery Dead", "Starting Trouble", "Other"] },
        Cutlery: { brands: [], problems: ["Standard Kitchen Knife Sharpening", "Chef's Knife Sharpening", "Chipped Blade Repair", "Rust Removal", "Other"] },
        AC: { brands: ["Daikin", "Voltas", "LG", "Blue Star", "Hitachi", "Mitsubishi", "Other"], problems: ["Zero Cooling", "Gas Leak / Refill", "Water Dripping", "Loud Noise", "Premium Deep Clean", "PCB Issue", "Installation"] },
        WashingMachine: { brands: ["Bosch", "LG", "IFB", "Samsung", "Whirlpool", "Siemens", "Other"], problems: ["Drum Not Spinning", "Water Leakage", "Vibration/Noise", "Not Powering", "Door Locked", "Error Code", "Other"] },
        Refrigerator: { brands: ["LG", "Samsung", "Whirlpool", "Haier", "Bosch", "Other"], problems: ["Not Cooling", "Excessive Ice", "Compressor Dead", "Water Leaking", "Door Seal", "Other"] },
        Geyser: { brands: ["AO Smith", "Racold", "Bajaj", "Havells", "Crompton", "Other"], problems: ["No Hot Water", "Water Leakage", "Electrical Shock", "Installation", "Other"] },
        RO: { brands: ["Kent", "Aquaguard", "Pureit", "Livpure", "ZeroB", "Other"], problems: ["Filter Change", "Not Purifying", "Water Leakage", "Motor Dead", "Other"] },
        TV: { brands: ["Samsung", "LG", "Sony", "Mi", "TCL", "Vu", "Other"], problems: ["Display Broken", "No Sound", "Motherboard Issue", "Not Powering On", "Other"] },
        Microwave: { brands: ["LG", "Samsung", "IFB", "Panasonic", "Whirlpool", "Other"], problems: ["Not Heating", "Button Not Working", "Sparking", "Turntable Dead", "Other"] },
        Electrician: { brands: [], problems: ["MCB Tripping", "Short Circuit Repair", "Smart Home Install", "Complete Rewiring", "Switch/Socket Replace", "Other"] }
    };

    const categorySelect = document.getElementById('serviceCategory');
    const brandSelect = document.getElementById('serviceBrand');
    const problemSelect = document.getElementById('serviceProblem');
    const brandGroup = document.getElementById('brandGroup');
    const problemGroup = document.getElementById('problemGroup');
    const bookingForm = document.getElementById('bookingForm');
   
    const modelGroup = document.getElementById('modelGroup');
    const modelInput = document.getElementById('serviceModel');

    categorySelect.addEventListener('change', (e) => {
        const category = e.target.value;
        const options = formOptions[category];

        brandSelect.innerHTML = '<option value="" disabled selected>Select Brand</option>';
        problemSelect.innerHTML = '<option value="" disabled selected>Select Diagnosed Issue</option>';

        if (category === 'Electrician' || category === 'Cutlery') {
            brandGroup.style.display = 'none';
            brandSelect.required = false;
           
            modelGroup.style.display = 'none';
            modelInput.required = false;
        } else {
            brandGroup.style.display = 'block';
            brandSelect.required = true;
           
            modelGroup.style.display = 'block';
            modelInput.required = true;
           
            options.brands.forEach(brand => {
                brandSelect.appendChild(new Option(brand, brand));
            });
        }

        problemGroup.style.display = 'block';
        problemSelect.required = true;
        options.problems.forEach(problem => {
            problemSelect.appendChild(new Option(problem, problem));
        });
    });

    // 5. WHATSAPP SUBMISSION
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const address = document.getElementById('customerAddress').value.trim();
        const date = document.getElementById('prefDate').value;
        const timeSlot = document.getElementById('prefTime').value;
        const category = categorySelect.options[categorySelect.selectedIndex].text;
        const brand = brandSelect.value;
        const problem = problemSelect.value;
        const model = modelInput ? modelInput.value.trim() : "";

        let message = `*🌟 SORTED PRIORITY BOOKING 🌟*\n\n`;
        message += `*CLIENT DETAILS*\nName: ${name}\nPhone: ${phone}\nAddress/Area: ${address}\n\n`;
        message += `*DIAGNOSTIC REQUEST*\nCategory: ${category}\n`;
       
        if (categorySelect.value !== 'Electrician' && categorySelect.value !== 'Cutlery') {
            message += `Brand: ${brand}\n`;
            message += `Exact Model / Item: ${model}\n`;
        }
       
        message += `Reported Issue: ${problem}\n\n`;
        message += `*REQUESTED SCHEDULE*\nDate: ${date}\nTime Slot: ${timeSlot}\n\n`;
        message += `*Note:* Client acknowledges standard ₹300 Visiting/Pickup fee applies.`;

        const encodedMessage = encodeURIComponent(message);
       
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const waUrl = isMobile
            ? `https://api.whatsapp.com/send?phone=919164248035&text=${encodedMessage}`
            : `https://web.whatsapp.com/send?phone=919164248035&text=${encodedMessage}`;

        window.open(waUrl, '_blank');
    });
});

