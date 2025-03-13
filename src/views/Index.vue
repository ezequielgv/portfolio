<template>
	<div class="container" ref="container">
		<!-- Navegación -->
		<nav class="top-menu" :class="{ scrolled: isScrolled }">
			<!-- Botón hamburguesa para móvil -->
			<button class="hamburger-btn" @click="isMenuOpen = !isMenuOpen" v-show="isMobile">
				<svg viewBox="0 0 100 80" width="30" height="30"> <rect width="100" height="15" rx="8"></rect> <rect y="30" width="100" height="15" rx="8"></rect> <rect y="60" width="100" height="15" rx="8"></rect> </svg>
			</button>
			<!-- Enlaces de menú -->
			<div class="menu-links" :class="{ active: isMenuOpen }">
				<a v-for="(section, index) in sections" :key="index" :href="`#${section.id}`" 
					:style="{ color: activeSection === index ? getSectionColor(index) : '#555' }"
					@click="scrollToSection(section.id)"> {{ section.title }}
				</a>
			</div>
		</nav>

		<div class="progress-line" :style="progressStyle"></div> <!-- Línea de progreso -->
  
		<!-- Sección 1: Inicio -->
		<section class="section" id="inicio" :class="{ active: activeSection === 0 }">
			<NGrid :cols="isMobile ? 1 : 2" x-gap="12" responsive="screen">
				<n-gi :span="isMobile ? 1 : 1">
					<n-flex justify="center" class="image-wrapper">
						<div class="image-placeholder" :style="isMobile ? { width: '120px', height: '120px' } : {}">
							<n-image class="image-me" :src="meImage" :img-props="{ style: 'object-fit: cover; width: 100%; height: 100%' }" 
								:class="{ 'mobile-image': isMobile }"/>
						</div>
					</n-flex>
				</n-gi>
				<n-gi :span="isMobile ? 1 : 1">
					<div class="hero-content" :style="isMobile ? { margin: '20px 0 0 0' } : {}">
						<n-space vertical size="small" class="title-group">
							<n-h1 class="name-title" :style="{ color: colors.vue }">Ezequiel Gastón Videla</n-h1>
							<n-h3>Full Stack Developer</n-h3>
						</n-space>
						<div class="contact-info">
							<n-space vertical size="small">
								<n-p :depth="4" class="bio-text">
									Desarrollador web full stack con una gran pasión por desarrollar soluciones digitales robustas y escalables.
									Con amplia experiencia en proyectos innovadores, integro tecnologías modernas como Laravel, Vue.js y PHP,
									junto con metodologías ágiles, para entregar productos de alta calidad. Mi sólida formación técnica y logros,
									entre ellos ser campeón nacional en olimpíadas de programación, respaldan mi firme compromiso con la excelencia.
								</n-p>
							</n-space>
						</div>
					</div>
				</n-gi>
			</NGrid>
		</section>
  
		<!-- Sección 2: Habilidades -->
		<section class="section" id="habilidades" :class="{ active: activeSection === 1 }">
			<div class="section-header">
				<n-h2 class="section-title" :style="{ color: colors.laravel }">
					<n-icon :component="Code" /> Habilidades Técnicas
				</n-h2>
			</div>
	
			<n-scrollbar style="max-height: 75vh">
				<div class="skills-container">
					<n-card v-for="(category, index) in skillsData" :key="index" class="skill-category-card" hoverable>
						<template #header>
							<n-space>
								<div class="skill-header">
									<n-icon :component="category.icon" size="28" />
									<n-h3 class="category-title" :style="{ color: colors.laravel }">{{ category.title }}</n-h3>
								</div>
							</n-space>
						</template>
			
						<n-grid :cols="3" x-gap="12" y-gap="12">
							<n-gi v-for="(skill, i) in category.skills" :key="i">
								<n-card class="skill-detail-card" hoverable size="small" :bordered="false">
									<template #header>
										<n-h4 class="skill-title">{{ skill.name }}</n-h4>
									</template>
									<n-p style="margin: 0">{{ skill.description }}</n-p>
									<template #footer>
										<n-space justify="center">
											<n-rate v-if="skill.level" :value="skill.level" :count="5" readonly size="small" />
										</n-space>
									</template>
								</n-card>
							</n-gi>
						</n-grid>
					</n-card>
				</div>
			</n-scrollbar>
		</section>
  
	  <!-- Sección 3: Experiencia -->
	  <section class="section" id="experiencia" :class="{ active: activeSection === 2 }">
		<div class="section-header">
		  <n-h2 class="section-title" :style="{ color: colors.git }">
			<n-icon :component="Briefcase" /> Experiencia
		  </n-h2>
		</div>
		<div class="experience-container">
		  <n-scrollbar style="max-height: 75vh">
			<n-timeline>
			  <n-timeline-item v-for="(exp, index) in experienciaData" 
							 :key="index" 
							 :type="index === 0 ? 'success' : 'info'" 
							 line-type="dashed">
				<n-card hoverable class="experience-card">
				  <n-h3>{{ exp.title }}</n-h3>
				  <n-p depth="3">{{ exp.year }}</n-p>
				  <n-p>{{ exp.description }}</n-p>
				  <n-space>
					<n-tag v-for="(tech, i) in exp.techs" :key="i" :bordered="false" class="tech-tag">
					  {{ tech }}
					</n-tag>
				  </n-space>
				</n-card>
			  </n-timeline-item>
			</n-timeline>
		  </n-scrollbar>
		</div>
	  </section>
	</div>
  
	<ContactButton :active-section="activeSection"/>
  </template>
	
<script setup>
	import { ref, computed, onMounted, onBeforeUnmount, markRaw } from 'vue';
	import { 
		NH1, NH2, NH3, NIcon, NCard, NSpace, NTag, NTimeline, 
		NTimelineItem, NP, NGrid, NGi, NFlex, NImage, NScrollbar
	} from 'naive-ui';

	import ContactButton from '../components/FloatButton.vue';
	import { Briefcase as BriefcaseIcon } from '@vicons/tabler';
	import { Code as CodeIcon } from '@vicons/carbon';

	import experienciaData from '@/data/experiencia.js';
	import meImage from '@/assets/images/me.jpg';
	import skillsData from '@/data/skills.js';
  
	// Iconos no reactivos
	const Code = markRaw(CodeIcon);
	const Briefcase = markRaw(BriefcaseIcon);
  
	// Estados reactivos
	const container = ref(null);
	const isScrolled = ref(false);
	const isMenuOpen = ref(false);
	const isMobile = ref(false);
	const activeSection = ref(0);
	const sectionsRef = ref([]);
  
	// Configuración de colores
	const colors = { vue: '#41b883', laravel: '#ff2d20', git: '#f37c23', mysql: '#00758f', php: '#777bb4' };
  
	// Definición de secciones para el menú
	const sections = [
		{ id: 'inicio', title: 'Inicio' },
		{ id: 'habilidades', title: 'Habilidades' },
		{ id: 'experiencia', title: 'Experiencia' }
	];

	// Funciones para el diseño dinámico
	const progressStyle = computed(() => ({
		backgroundColor: getSectionColor(activeSection.value),
		height: `${[25, 50, 75][activeSection.value] || 0}%`
	}));

	const getSectionColor = (sectionIndex) => {
		const sectionColors = [colors.vue, colors.laravel, colors.git];
		return sectionColors[sectionIndex] || sectionColors[0];
	};

	// Función para detectar dispositivos móviles
	const checkMobile = () => { isMobile.value = window.innerWidth <= 768; };

	// Función para scroll suave
	const scrollToSection = (id) => { 
		if (isMobile.value) isMenuOpen.value = false;
		document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); 
	};

	// Manejo del scroll
	const handleScroll = () => {
		const containerEl = container.value;
		if (containerEl) { isScrolled.value = containerEl.scrollTop > 30; }
	};
  
	// Lifecycle hooks
	onMounted(() => {
		sectionsRef.value = document.querySelectorAll('.section'); // Obtener referencias a las secciones
	
		// Configurar el Intersection Observer
		const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };

		const sectionObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const index = Array.from(sectionsRef.value).findIndex(section => section === entry.target);
					if (index !== -1) { activeSection.value = index; }
				}
			});
		}, observerOptions);

		// Agregar listener de scroll
		if (container.value) { container.value.addEventListener('scroll', handleScroll); }

		// Observar todas las secciones
		sectionsRef.value.forEach(section => { sectionObserver.observe(section); });

		// Comprobar si es móvil
		checkMobile();
		window.addEventListener('resize', checkMobile);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('resize', checkMobile);
		if (container.value) { container.value.removeEventListener('scroll', handleScroll); }
	});
</script>