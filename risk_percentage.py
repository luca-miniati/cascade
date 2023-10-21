import torch
import torch.nn as nn
import pandas as pd
import copy

from listings_data import ListingsDataSet
from neuralnet import NeuralNetRiskPercentage



hidden_size1 = 128  # Number of neurons in the hidden layer
hidden_size2 = 64
hidden_size3 = 16
ouput_size = 1
num_epochs = 100
batch_size = 64 
learning_rate = 0.003  # Learning rate for the optimizer

# need data files
train_dataset = ListingsDataSet(dataset_path="data/clean/2013_2014.csv", dataset_type="train")
# test_dataset = ListingsDataSet(dataset_path="cleaned_test.csv", dataset_type="test")
validation_dataset = ListingsDataSet(dataset_path="data/clean/2013_2014_val.csv", dataset_type="train")

input_size = train_dataset.input_dimension # 22

train_loader = torch.utils.data.DataLoader(dataset=train_dataset, batch_size=batch_size, shuffle=True)
# test_loader = torch.utils.data.DataLoader(dataset=test_dataset, batch_size=batch_size, shuffle=False)
validation_loader = torch.utils.data.DataLoader(dataset=validation_dataset, batch_size=batch_size, shuffle=False)

model = NeuralNetRiskPercentage(input_size=input_size, hidden1=hidden_size1, hidden2=hidden_size2, hidden3=hidden_size3, output=ouput_size)

criterion = nn.L1Loss()

optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

n_total_steps = len(train_loader)

min_loss = 0
min_epoch = 0


for epoch in range(num_epochs):
    model.train()
    for i, (data, labels) in enumerate(train_loader):

        outputs = model(data)
        loss = criterion(outputs, labels)

        optimizer.zero_grad() 
        loss.backward()
        optimizer.step()

        # if (i + 1) % 10 == 0:
        #     print(f'epoch {epoch + 1} / {num_epochs}, step {i + 1}/{n_total_steps}, loss = {loss.item():.4f}')
    
    # torch.save(model.state_dict, f'epochs\epoch{epoch}.pth')
    
    model.eval()
    total_loss = 0
    for i, (data, labels) in enumerate(validation_loader):

        outputs = model(data)
        loss = criterion(outputs, labels)
        total_loss += loss

    if min_loss == 0:
        min_loss = total_loss
        min_epoch = epoch
    elif total_loss < min_loss:
        min_loss = total_loss
        min_epoch = epoch

    if (epoch+1) % 10 == 0:
        print(f'epoch {epoch+1}, min loss = {min_loss} at epoch: {min_epoch}')
        

print(f'min loss:  {min_loss} at epoch: {min_epoch}')


# torch.save(model.state_dict(), 'epochs\epoch#1100.pth') 
# model.load_state_dict(torch.load('epochs\epoch#254.pth'))
'''
predictions = []
with torch.no_grad():
    for data in test_loader:
        outputs = model(data)
        predictions.append(outputs)
predictions = torch.cat(predictions, dim=0)

predictions = predictions.ravel()

results_df = pd.DataFrame({'ID' : range(1461, 1461 + len(predictions)), 'SalePrice' : predictions})

results_df.to_csv('predictions.csv', index=False)
'''