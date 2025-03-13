<template>
    <n-float-button-group :x="20" :y="20" trigger="click" class="float-action-menu">
        <n-tooltip trigger="hover" placement="left">
            <template #trigger>
                <n-float-button @click="toggleMenu" class="main-button" :style="{ backgroundColor: currentColor }" >
                        <n-icon> <Plus/></n-icon>
                </n-float-button>
            </template>
            Contáctame
        </n-tooltip>

        <n-collapse-transition :show="showSubButtons">
            <div class="sub-buttons">
                <n-tooltip trigger="hover" placement="left">
                    <template #trigger>
                        <n-float-button @click="sendEmail" class="sub-button" :style="{ backgroundColor: currentColor }" >
                            <n-icon> <Mail /> </n-icon>
                        </n-float-button>
                    </template>
                    Enviar correo a ezequielev6@gmail.com
                </n-tooltip>

                <n-tooltip trigger="hover" placement="left">
                    <template #trigger>
                        <n-float-button @click="openWhatsApp" class="sub-button" :style="{ backgroundColor: currentColor }" >
                            <n-icon> <Phone/> </n-icon>
                        </n-float-button>
                    </template>
                    Contactar por WhatsApp al (+54) 221 364 - 2317
                </n-tooltip>
            </div>
        </n-collapse-transition>
    </n-float-button-group>
</template>
  
<script setup>
    import { NFloatButton, NFloatButtonGroup, NTooltip, NCollapseTransition, NIcon } from 'naive-ui';
    import { Mail, Phone, Plus} from '@vicons/tabler';
    import { ref, onMounted } from 'vue';

    const props = defineProps({
        activeSection: { type: Number, default: 0 }
    });

    const colors = ['#f37c23', '#ff2d20', '#41b883'];
    const currentColor = ref(colors[0]);
    const showSubButtons = ref(false);
  
    const toggleMenu = () => { showSubButtons.value = !showSubButtons.value; };
    const openWhatsApp = () => { window.open(`https://wa.me/+542213642317`, '_blank'); };
    // const sendEmail = () => { window.location.href = 'mailto:ezequielev6@gmail.com'; };  
    const sendEmail = () => {
        const email = 'ezequielev6@gmail.com';
        const subject = 'Oportunidad de proyecto | Full Stack Developer';
        const body = 'Hola Ezequiel, te contacto por...';

        // URL especial para Gmail
        const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.open(gmailUrl, '_blank');
    };

    // Lógica para detectar sección activa
    onMounted(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    // Obtener el índice invertido
                    const sections = Array.from(document.querySelectorAll('.section'));
                    const index = sections.length - 1 - sections.indexOf(entry.target);
                    currentColor.value = colors[index] || colors[0];
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.section').forEach(section => observer.observe(section));
    });
</script>
  
<style scoped>
    .sub-buttons {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 8px;
    }
  
    .float-action-menu {
        position: fixed;
        bottom: 20px;
        right: 35px;
        z-index: 1000;
    }
  
    .sub-button { transform: scale(0.8); }
    .n-icon { font-size: 24px !important; }
</style>