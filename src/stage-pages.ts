import type { Stage } from './resources.ts';

export type StageId = 'data-sourcing' | 'data-cleaning' | 'modeling' | 'production';

export interface StagePageData {
  id: StageId;
  path: string;
  aliases?: readonly string[];
  number: string;
  title: Stage;
  summary: string;
  art?: string;
  artWidth?: number;
  artHeight?: number;
  artAlt?: string;
  topics: readonly { title: string; text: string }[];
  practice: string;
  resourceIds: readonly string[];
}

export const stagePages: readonly StagePageData[] = [
  {
    id: 'data-sourcing', path: '/daata-sourcing', aliases: ['/data-sourcing'], number: '01', title: 'Data Sourcing',
    summary: 'Collect data from a source, often a database. Use simple SQL (DML) queries to extract what you need, then check its accuracy and completeness.',
    art: '/assets/foundations.webp', artWidth: 1513, artHeight: 1039, artAlt: 'A translucent blue saddle surface on three coordinate axes.',
    topics: [
      { title: 'Define what you want to predict', text: 'Write down the question, what one row represents, and the outcome you want to estimate. Identify which inputs would actually be available when making a prediction.' },
      { title: 'Explore a dataset before committing', text: 'Read the description and inspect the columns, target, sample size, and missing values. Ask whether the examples represent the problem you want to solve.' },
      { title: 'Keep track of where it came from', text: 'Record the source, collection context, version, and usage terms. Keep an untouched copy of the original data and a short description of each field.' },
    ],
    practice: 'Choose a small tabular dataset from UCI or OpenML. Write a one-page dataset brief: your question, the target, useful inputs, data limitations, and the original source.',
    resourceIds: ['uci', 'openml'],
  },
  {
    id: 'data-cleaning', path: '/data-cleaning', number: '02', title: 'Data Cleaning',
    summary: 'Data cleaning often takes the most time. Use applied statistics, including mean, median, mode, and imputation, to fix data issues and prepare the dataset for your model.',
    art: '/assets/scikit-learn.svg', artWidth: 232, artHeight: 124, artAlt: 'scikit-learn',
    topics: [
      { title: 'Understand the table', text: 'Use pandas to inspect rows, data types, and summary statistics. Look for missing values, duplicate records, inconsistent labels, and values that do not make sense for the field.' },
      { title: 'Choose transformations deliberately', text: 'Learn imputation, categorical encoding, and feature scaling. Match each transformation to the column and the model, and document why you chose it.' },
      { title: 'Keep preprocessing inside the pipeline', text: 'Split off test data before learning transformations. Fit imputers, scalers, and encoders on training data only, then apply those fitted transformations to new data. Use a scikit-learn Pipeline to keep the steps together.' },
    ],
    practice: 'Create a data-quality report for your sourced dataset. Then build a preprocessing pipeline for its numerical and categorical columns, keeping the test data separate from every fitting step.',
    resourceIds: ['pandas', 'preprocessing', 'pitfalls', 'numpy'],
  },
  {
    id: 'modeling', path: '/modeling', number: '03', title: 'Modeling',
    summary: 'Train and compare machine learning models using established algorithms and libraries. These tools simplify modeling, so you can focus on finding the best fit for your data.',
    art: '/assets/decision-tree.webp', artWidth: 1430, artHeight: 1100, artAlt: 'A blue decision tree with four prediction leaves.',
    topics: [
      { title: 'Connect the task to an estimator', text: 'Learn how features and targets enter fit and predict. Distinguish classification, regression, and clustering, and start with a simple baseline appropriate to your task.' },
      { title: 'Explore the classical model families', text: 'Study linear models, nearest neighbors, decision trees, and ensembles. Compare a few candidates using the same data preparation and evaluation setup before adding complexity.' },
      { title: 'Evaluate on data the model has not seen', text: 'Use cross-validation to compare candidates and tune choices on training data. Choose splits that respect time or related groups when relevant, and reserve a separate test set for final evaluation.' },
    ],
    practice: 'Compare a baseline and two classical models with the same validation splits. Record a task-appropriate metric, explain the main errors, and evaluate your chosen pipeline once on the held-out test set.',
    resourceIds: ['sklearn', 'validation', 'isl', 'mooc'],
  },
  {
    id: 'production', path: '/production', number: '04', title: 'Production',
    summary: 'Deploy the model to make predictions on live data. Monitor its accuracy and performance over time to spot issues and keep predictions reliable.',
    topics: [
      { title: 'Save the complete prediction workflow', text: 'Persist the fitted preprocessing and model together. Record the training-data reference, feature definitions, dependency versions, and evaluation results so the artifact can be understood later.' },
      { title: 'Load and predict in a fresh environment', text: 'Learn the persistence formats and their tradeoffs. Check compatibility with the training environment, and only load model artifacts from sources you trust. Confirm that reloading preserves your predictions.' },
      { title: 'Keep training and serving consistent', text: 'Validate incoming fields and apply the same fitted preprocessing used during training. Decide how you will observe prediction failures and review model quality as new outcomes become available.' },
    ],
    practice: 'Save your selected pipeline and load it in a fresh Python process. Predict on a few new rows, verify the results against the original model, and write down the expected input fields and dependency versions.',
    resourceIds: ['persistence', 'pitfalls', 'sklearn'],
  },
];

export function getStagePage(pathname: string): StagePageData | undefined {
  const path = pathname.replace(/\/+$/, '') || '/';
  return stagePages.find(stage => stage.path === path || stage.aliases?.includes(path));
}
