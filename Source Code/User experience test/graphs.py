# Task Completion Time
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from wordcloud import WordCloud, STOPWORDS

# 1
time = pd.read_excel("./Test duration.xlsx", sheet_name='Sheet2')
columns = time.columns[0:]
col_list = []
for col in columns:
    col_list.append(col)

ave_data = [None]
for col in col_list:
    ave_data.append(time[col].mean())

plt.figure(dpi=120, figsize=(7, 5))
plt.title("Task Completion Time")
plt.xlabel("Tasks")
plt.ylabel("Time")

x_range = range(1, 15, 1)
x_tasks = ["A.1", "A.2", "A.3", "A.4", "B.1", "B.2", "B.3", "C.1", "C.2", "D.1", "E.1", "F.1", "F.2", "G.1"]
plt.ylim([0, 70])
plt.xticks(x_range, x_tasks)

for col in range(14):
    plt.scatter([col+1]*len(time), time.iloc[:, col], color='b', alpha=0.7)
plt.plot(ave_data, 'r*-', alpha=0.5, linewidth=2, label='average time')
plt.legend()

# Questionnaire Part 1 - SUS
# 2
sus = pd.read_excel("./Questionnaire_part1.xlsx", sheet_name='Sheet2')
sus_mean = np.mean(sus)
sus_std = np.std(sus, ddof=1)

print("mean:%f" % sus_mean)
print("standard deviation:%f" % sus_std)
print("The range is from", sus_mean-sus_std, "to", sus_mean+sus_std)

plt.figure(dpi=110, figsize=(5, 3))
plt.title("SafeTweet SUS Score")
plt.ylabel("Score")
plt.ylim([0, 110])
plt.xticks([])
plt.axhline(68, color='r', linestyle='--', label='average')
plt.boxplot(sus, widths=0.5)
plt.legend()

# 3
plt.figure(dpi=150, figsize=(5, 3))
plt.title("Each Score and SUS Standard Score")

plt.ylim([0, 110])
xticks = np.arange(0, 31, 2)
plt.xticks(xticks)

plt.xlabel('Number of Participants')
plt.ylabel('Score')
plt.axhline(68, color='r', linestyle='--', label='average score')
plt.plot(sus, 'b*-', alpha=0.5, linewidth=1, label='score')
plt.legend()


# Questionnaire Part 2 - UEQ
# 4
ueq = pd.read_excel("../User experience test/Questionnaire_part2.xlsx", sheet_name='Sheet2')
ueq_mean = np.mean(ueq)
ueq_std = np.std(ueq, ddof=1)

print("mean:%f"% ueq_mean)
print("standard deviation:%f" % ueq_std)
print("The range is from", ueq_mean-ueq_std, "to", ueq_mean+ueq_std)

plt.figure(dpi=110, figsize=(5, 3))
plt.title("SafeTweet UEQ Score")

plt.ylabel("Score")
plt.ylim([0, 6])
plt.xticks([])
plt.axhline(3.853741, color='r', linestyle='--', label='average')
plt.boxplot(ueq, widths=0.5)
plt.legend()

# 5
plt.figure(dpi=150, figsize=(5, 3))
plt.title("Each Score and Average Score")

plt.ylim([0, 6])
xticks = np.arange(0, 31, 2)
plt.xticks(xticks)

plt.xlabel('Number of Participants')
plt.ylabel('Score')
plt.axhline(3.853741, color='r', linestyle='--', label='average')
plt.plot(ueq, 'b*-', alpha=0.5, linewidth=1, label='score')
plt.legend()

# 6
factors = ('content', 'usability', 'interactivity', 'visual', 'subjective feeling')
ave_score = pd.read_excel("./Questionnaire_part2.xlsx", sheet_name='Sheet3')
array = np.array(ave_score)
ave_score = array.tolist()
ave_score = [x for [x] in ave_score]

plt.figure(dpi=150, figsize=(5, 2))
plt.title("Each Factor Average Score")
plt.xticks(fontsize=8)
plt.ylim([0, 5])
yticks = np.arange(0, 5.5, 0.5)
plt.yticks(yticks)

plt.bar(factors, ave_score, width=0.3, alpha=0.8)
plt.axhline(3.853741, color='r', alpha=0.5, linestyle='--', label='average')
plt.legend()

# 7
factors = ['content', 'usability', 'interactivity', 'visual','subjective feeling']
rate = pd.read_excel("./Questionnaire_part2.xlsx", sheet_name='Sheet4')
array = np.array(rate)
rate = array.tolist()
rate = [x for [x] in rate]

x_0 = [1, 0, 0, 0]
plt.figure(dpi=150, figsize=(3, 3))
plt.pie(rate, labels=factors, autopct='%1.1f%%')
plt.pie(x_0, radius=0.25, colors='w')
plt.title("Factor Weight")
plt.show()

# 8
f1 = open(u'./SAQ-1.csv', 'r', encoding='utf-8').read()
stopwords = set(STOPWORDS)
wordcloud1 = WordCloud(
        background_color="white",
        width=1500,
        height=960,
        margin=10,
        stopwords=stopwords
        ).generate(f1)
plt.figure(dpi=150, figsize=(3, 3))
plt.title("Overall Views")
plt.imshow(wordcloud1)
plt.axis("off")
plt.show()

# 9
f2 = open(u'./SAQ-2.1.csv', 'r', encoding='utf-8').read()
wordcloud2 = WordCloud(
        background_color="white",
        width=1500,
        height=960,
        margin=10,
        stopwords=stopwords
        ).generate(f2)
plt.figure(dpi=150, figsize=(3, 3))
plt.title("Positive Point")
plt.imshow(wordcloud2)
plt.axis("off")
plt.show()

# 10
f3 = open(u'./SAQ-2.2.csv', 'r', encoding='utf-8').read()
wordcloud3 = WordCloud(
        background_color="white",
        width=1500,
        height=960,
        margin=10,
        stopwords=stopwords
        ).generate(f2)
plt.figure(dpi=150, figsize=(3, 3))
plt.title("Negative Point")
plt.imshow(wordcloud3)
plt.axis("off")
plt.show()




