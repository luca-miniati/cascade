import os
import pandas as pd

# Directory containing the individual training files
training_files_dir = 'C:\\Users\\jackt\\p2p\\p2p\\data\\clean'

# Output mega training and validation file paths
mega_training_file = 'mega_training.csv'
mega_validation_file = 'mega_val.csv'

# List of training files
training_files = [os.path.join(training_files_dir, filename) for filename in os.listdir(training_files_dir) if filename.endswith('.csv')]

# Initialize mega training and validation DataFrames
mega_training_df = pd.DataFrame()
mega_validation_df = pd.DataFrame()

training_dfs = []
validation_dfs = []

# Split ratio (70% training, 30% validation)
split_ratio = 0.7

# Process each training file
for training_file in training_files:
    try:
        # Load the data from the current training file
        current_data = pd.read_csv(training_file)
        
        # Split the data into training and validation subsets
        num_training_samples = int(len(current_data) * split_ratio)
        training_subset = current_data[:num_training_samples]
        validation_subset = current_data[num_training_samples:]
        
        # Append the subsets to the lists
        training_dfs.append(training_subset)
        validation_dfs.append(validation_subset)
    except Exception as e:
        print(f"Error processing {training_file}: {str(e)}")

              
mega_training_df = pd.concat(training_dfs, ignore_index=True)
mega_validation_df = pd.concat(validation_dfs, ignore_index=True)

# Save the mega training and validation files
mega_training_df.to_csv(mega_training_file, index=False)
mega_validation_df.to_csv(mega_validation_file, index=False)

print(f'Total training file saved to {mega_training_file}')
print(f'Total validation file saved to {mega_validation_file}')