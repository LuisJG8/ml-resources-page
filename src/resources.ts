export const stages = ['Data Sourcing', 'Data Cleaning', 'Modeling', 'Production'] as const;

export type Stage = typeof stages[number];
export type ResourceGroup = Stage | 'All resources';

export const resourceCategories = [
  { id: 'videos', label: 'Videos' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'books', label: 'Books' },
  { id: 'courses', label: 'Courses' },
  { id: 'tutorials', label: 'Tutorials & docs' },
  { id: 'interactive', label: 'Interactive' },
  { id: 'datasets', label: 'Datasets' },
] as const;

export type ResourceCategory = typeof resourceCategories[number]['id'];
export type CategoryFilter = ResourceCategory | 'all';

export interface Resource {
  id: string;
  image: string;
  category: ResourceCategory;
  title: string;
  subtitle?: string;
  group: Stage;
  format: string;
  access?: string;
  url: string;
  description: string;
}

export const resources: readonly Resource[] = [
  { id: 'aws-ai-practitioner', image: '/assets/resources/aws-ai-practitioner.webp', category: 'certifications', title: 'AWS Certified AI Practitioner', group: 'Modeling', format: 'Cloud certification', access: 'Paid exam', url: 'https://aws.amazon.com/certification/certified-ai-practitioner/', description: 'Study foundational AI and machine learning concepts and their uses on AWS. Follow the official certification and exam preparation information.' },
  { id: 'azure-data-fundamentals', image: '/assets/resources/azure-data-fundamentals.svg', category: 'certifications', title: 'Microsoft Certified: Azure Data Fundamentals', group: 'Data Sourcing', format: 'Cloud certification', access: 'Paid exam', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/', description: 'Learn core data concepts, relational and non-relational databases, and analytics workloads on Azure. Start with the official DP-900 preparation material.' },
  { id: 'pitfalls', image: '/assets/scikit-learn.svg', category: 'tutorials', title: 'Common pitfalls and data leakage', group: 'Data Cleaning', format: 'Documentation', url: 'https://scikit-learn.org/stable/common_pitfalls.html', description: 'Keep preprocessing consistent and learn how to prevent information leaking from test data into training.' },
  { id: 'uci', image: '/assets/resources/uci.webp', category: 'datasets', title: 'UCI Machine Learning Repository', group: 'Data Sourcing', format: 'Datasets', url: 'https://archive.ics.uci.edu/', description: 'Find real-world datasets for classification, regression, and clustering.' },
  { id: 'openml', image: '/assets/resources/openml.webp', category: 'datasets', title: 'OpenML', group: 'Data Sourcing', format: 'Datasets', url: 'https://www.openml.org/', description: 'Explore shared datasets and choose a starting point for your project.' },
  { id: 'preprocessing', image: '/assets/resources/preprocessing.webp', category: 'tutorials', title: 'Preprocessing with scikit-learn', group: 'Data Cleaning', format: 'Documentation', url: 'https://scikit-learn.org/stable/modules/preprocessing.html', description: 'Scale numerical features and encode categories for your model.' },
  { id: 'persistence', image: '/assets/scikit-learn.svg', category: 'tutorials', title: 'Model persistence', group: 'Production', format: 'Documentation', url: 'https://scikit-learn.org/stable/model_persistence.html', description: 'Compare ways to save a trained model and load it for predictions.' },
  { id: 'seeing', image: '/assets/resources/seeing.webp', category: 'interactive', title: 'Seeing Theory', subtitle: 'Visual statistics', group: 'Modeling', format: 'Interactive', url: 'https://seeing-theory.brown.edu/', description: 'An interactive introduction to probability and statistics through beautiful visualizations.' },
  { id: 'linear', image: '/assets/resources/linear.webp', category: 'videos', title: '3Blue1Brown', subtitle: 'Linear algebra', group: 'Modeling', format: 'Video series', url: 'https://www.3blue1brown.com/?topic=linear-algebra', description: 'A clear, visual guide to the linear algebra behind machine learning.' },
  { id: 'numpy', image: '/assets/resources/numpy.svg', category: 'tutorials', title: 'NumPy learning resources', group: 'Data Cleaning', format: 'Tutorials', url: 'https://numpy.org/learn/', description: 'Get comfortable with arrays, vectorized operations, and numerical computing in Python.' },
  { id: 'pandas', image: '/assets/resources/pandas.svg', category: 'tutorials', title: 'pandas getting started', group: 'Data Cleaning', format: 'Tutorials', url: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/', description: 'Learn to load, explore, reshape, and prepare tabular data before modeling.' },
  { id: 'isl', image: '/assets/resources/isl.webp', category: 'books', title: 'An Introduction to Statistical Learning', group: 'Modeling', format: 'Book & labs', url: 'https://www.statlearning.com/', description: 'A beginner-friendly introduction to regression, classification, trees, SVMs, and unsupervised learning, with practical labs.' },
  { id: 'google', image: '/assets/resources/google.webp', category: 'courses', title: 'Google Machine Learning Crash Course', group: 'Modeling', format: 'Course', url: 'https://developers.google.com/machine-learning/crash-course', description: 'A practical introduction to regression, classification, data preparation, and generalization. Start with the foundational modules.' },
  { id: 'r2d3', image: '/assets/resources/r2d3.webp', category: 'interactive', title: 'R2D3: A visual introduction to ML', group: 'Modeling', format: 'Visual essay', url: 'https://r2d3.us/visual-intro-to-machine-learning-part-1/', description: 'Follow a housing dataset through decision trees, training, testing, and overfitting.' },
  { id: 'mlu', image: '/assets/resources/mlu.webp', category: 'interactive', title: 'MLU-Explain', group: 'Modeling', format: 'Interactive', url: 'https://mlu-explain.github.io/', description: 'Explore visual explanations of regression, decision trees, random forests, and model evaluation.' },
  { id: 'clustering', image: '/assets/resources/clustering.webp', category: 'tutorials', title: 'Clustering with scikit-learn', group: 'Modeling', format: 'Documentation', url: 'https://scikit-learn.org/stable/modules/clustering.html', description: 'Compare k-means, DBSCAN, and other ways to discover structure in unlabeled data.' },
  { id: 'sklearn', image: '/assets/scikit-learn.svg', category: 'tutorials', title: 'scikit-learn', subtitle: 'Tutorials and examples', group: 'Modeling', format: 'Documentation', url: 'https://scikit-learn.org/stable/getting_started.html', description: 'Build your first estimators, combine preprocessing and models, and make predictions with real code.' },
  { id: 'mooc', image: '/assets/resources/mooc.webp', category: 'courses', title: 'The scikit-learn MOOC', group: 'Modeling', format: 'Course', url: 'https://inria.github.io/scikit-learn-mooc/', description: 'Practice predictive modeling with notebooks, exercises, quizzes, and realistic tabular datasets.' },
  { id: 'validation', image: '/assets/resources/validation.webp', category: 'tutorials', title: 'Cross-validation, explained', group: 'Modeling', format: 'Documentation', url: 'https://scikit-learn.org/stable/modules/cross_validation.html', description: 'Learn to evaluate models on unseen data and choose an appropriate validation strategy.' },
];
