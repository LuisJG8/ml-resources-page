import { resources } from './resources.ts';
import type { Resource } from './resources.ts';

// Keep the existing study-page references separate from the curated library formats.
export const studyResources: readonly Omit<Resource, 'category'>[] = [
  ...resources,
  {"id": "pitfalls", "image": "/assets/scikit-learn.svg", "title": "Common pitfalls and data leakage", "group": "Data Cleaning", "format": "Documentation", "url": "https://scikit-learn.org/stable/common_pitfalls.html", "description": "Keep preprocessing consistent and learn how to prevent information leaking from test data into training."},
  {"id": "uci", "image": "/assets/resources/uci.webp", "title": "UCI Machine Learning Repository", "group": "Data Sourcing", "format": "Datasets", "url": "https://archive.ics.uci.edu/", "description": "Find real-world datasets for classification, regression, and clustering."},
  {"id": "openml", "image": "/assets/resources/openml.webp", "title": "OpenML", "group": "Data Sourcing", "format": "Datasets", "url": "https://www.openml.org/", "description": "Explore shared datasets and choose a starting point for your project."},
  {"id": "preprocessing", "image": "/assets/resources/preprocessing.webp", "title": "Preprocessing with scikit-learn", "group": "Data Cleaning", "format": "Documentation", "url": "https://scikit-learn.org/stable/modules/preprocessing.html", "description": "Scale numerical features and encode categories for your model."},
  {"id": "persistence", "image": "/assets/scikit-learn.svg", "title": "Model persistence", "group": "Production", "format": "Documentation", "url": "https://scikit-learn.org/stable/model_persistence.html", "description": "Compare ways to save a trained model and load it for predictions."},
  {"id": "numpy", "image": "/assets/resources/numpy.svg", "title": "NumPy learning resources", "group": "Data Cleaning", "format": "Tutorials", "url": "https://numpy.org/learn/", "description": "Get comfortable with arrays, vectorized operations, and numerical computing in Python."},
  {"id": "pandas", "image": "/assets/resources/pandas.svg", "title": "pandas getting started", "group": "Data Cleaning", "format": "Tutorials", "url": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/", "description": "Learn to load, explore, reshape, and prepare tabular data before modeling."},
  {"id": "clustering", "image": "/assets/resources/clustering.webp", "title": "Clustering with scikit-learn", "group": "Modeling", "format": "Documentation", "url": "https://scikit-learn.org/stable/modules/clustering.html", "description": "Compare k-means, DBSCAN, and other ways to discover structure in unlabeled data."},
  {"id": "sklearn", "image": "/assets/scikit-learn.svg", "title": "scikit-learn", "subtitle": "Tutorials and examples", "group": "Modeling", "format": "Documentation", "url": "https://scikit-learn.org/stable/getting_started.html", "description": "Build your first estimators, combine preprocessing and models, and make predictions with real code."},
  {"id": "validation", "image": "/assets/resources/validation.webp", "title": "Cross-validation, explained", "group": "Modeling", "format": "Documentation", "url": "https://scikit-learn.org/stable/modules/cross_validation.html", "description": "Learn to evaluate models on unseen data and choose an appropriate validation strategy."},
];
